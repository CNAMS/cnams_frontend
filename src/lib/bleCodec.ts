/**
 * BLE Frame Codec and CRC-16 implementation for the CNAMS measuring device.
 * 
 * Frame Specification (11 bytes, Big-Endian):
 *   [0]      Start marker (0xA5)
 *   [1]      Channel (0x00 = Weight in grams, 0x01 = Length in mm)
 *   [2]      Flags (bit 0: 1 = Stable/Locked, 0 = Unstable/Jittery)
 *   [3..6]   Value: int32 (grams for weight, mm for length)
 *   [7..8]   Sequence: uint16
 *   [9..10]  CRC-16/CCITT-FALSE over bytes [0..8] (Poly 0x1021, Init 0xFFFF)
 */

export const START_MARKER = 0xa5;
export const FRAME_LENGTH = 11;

export const BLE_GATT_SERVICE_UUID = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';
export const BLE_GATT_MEASUREMENT_CHAR_UUID = 'beb5483e-36e1-4688-b7f5-ea07361b26a8';
export const BLE_DEVICE_NAME_PREFIX = 'CGMS';

export type DeviceChannel = 'weight' | 'length';

export interface DecodedBlePacket {
  channel: DeviceChannel;
  valueRaw: number;
  stable: boolean;
  sequence: number;
  valueFormatted: string; // e.g. "12.45" kg or "84.5" cm
  unit: string;           // "kg" or "cm"
}

/**
 * Calculates 16-bit CRC-CCITT (polynomial 0x1021, initial value 0xFFFF, no final XOR).
 */
export function crc16Ccitt(data: Uint8Array): number {
  let crc = 0xffff;
  for (let i = 0; i < data.length; i++) {
    crc ^= data[i] << 8;
    for (let bit = 0; bit < 8; bit++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ 0x1021) & 0xffff;
      } else {
        crc = (crc << 1) & 0xffff;
      }
    }
  }
  return crc & 0xffff;
}

/**
 * Decodes an 11-byte DataView / Uint8Array / ArrayBuffer received from the BLE notification.
 * Throws an Error if the frame length, start marker, or CRC is invalid.
 */
export function decodeBleFrame(input: ArrayBufferLike | Uint8Array | DataView): DecodedBlePacket {
  let view: DataView;
  let bytes: Uint8Array;

  if (input instanceof DataView) {
    view = input;
    bytes = new Uint8Array(input.buffer, input.byteOffset, input.byteLength);
  } else if (input instanceof Uint8Array) {
    view = new DataView(input.buffer, input.byteOffset, input.byteLength);
    bytes = input;
  } else {
    view = new DataView(input);
    bytes = new Uint8Array(input);
  }

  if (view.byteLength !== FRAME_LENGTH) {
    throw new Error(`Invalid frame length: expected ${FRAME_LENGTH}, got ${view.byteLength}`);
  }

  const marker = view.getUint8(0);
  if (marker !== START_MARKER) {
    throw new Error(`Invalid start marker: expected 0x${START_MARKER.toString(16)}, got 0x${marker.toString(16)}`);
  }

  const payload = bytes.subarray(0, 9);
  const expectedCrc = crc16Ccitt(payload);
  const receivedCrc = view.getUint16(9, false); // big-endian

  if (expectedCrc !== receivedCrc) {
    throw new Error(`CRC mismatch: expected 0x${expectedCrc.toString(16)}, got 0x${receivedCrc.toString(16)}`);
  }

  const channelRaw = view.getUint8(1);
  const flags = view.getUint8(2);
  const valueRaw = view.getInt32(3, false); // big-endian signed 32-bit integer
  const sequence = view.getUint16(7, false); // big-endian uint16

  const channel: DeviceChannel = channelRaw === 0 ? 'weight' : 'length';
  const stable = (flags & 0x01) !== 0;

  let valueFormatted = '0.0';
  let unit = 'kg';

  if (channel === 'weight') {
    // raw value in grams -> convert to kg with 2 decimals (e.g. 12450g -> 12.45 kg)
    const kg = valueRaw / 1000;
    valueFormatted = kg >= 0 ? kg.toFixed(2) : '0.00';
    unit = 'kg';
  } else {
    // raw value in mm -> convert to cm with 1 decimal (e.g. 845mm -> 84.5 cm)
    const cm = valueRaw / 10;
    valueFormatted = cm >= 0 ? cm.toFixed(1) : '0.0';
    unit = 'cm';
  }

  return {
    channel,
    valueRaw,
    stable,
    sequence,
    valueFormatted,
    unit,
  };
}

/**
 * Creates an encoded 11-byte frame (useful for simulator testing in browser).
 */
export function encodeBleFrame(
  channel: DeviceChannel,
  valueRaw: number,
  stable: boolean,
  sequence: number = 0
): Uint8Array {
  const bytes = new Uint8Array(FRAME_LENGTH);
  const view = new DataView(bytes.buffer);

  view.setUint8(0, START_MARKER);
  view.setUint8(1, channel === 'weight' ? 0x00 : 0x01);
  view.setUint8(2, stable ? 0x01 : 0x00);
  view.setInt32(3, valueRaw, false);
  view.setUint16(7, sequence & 0xffff, false);

  const crc = crc16Ccitt(bytes.subarray(0, 9));
  view.setUint16(9, crc, false);

  return bytes;
}
