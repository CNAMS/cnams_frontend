'use client';

import React, { useState, useRef } from 'react';
import {
  Usb,
  AlertCircle,
  FileCode,
  Terminal,
  Zap,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { ESPLoader, Transport } from 'esptool-js';

export function WebSerialFlasher() {
  const [file, setFile] = useState<File | null>(null);
  const [fileData, setFileData] = useState<Uint8Array | null>(null);
  const [isFlashing, setIsFlashing] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [isSupported, setIsSupported] = useState<boolean>(true);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (typeof window !== 'undefined' && !('serial' in navigator)) {
      setIsSupported(false);
    }
  }, []);

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev.slice(-100), msg]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!selected.name.endsWith('.bin')) {
      addLog('Error: Please select an ESP32 firmware .bin file');
      return;
    }

    setFile(selected);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        setFileData(new Uint8Array(reader.result));
      }
    };
    reader.readAsArrayBuffer(selected);
    addLog(`Loaded firmware: ${selected.name} (${(selected.size / 1024).toFixed(1)} KB)`);
  };

  const handleFlashUsb = async () => {
    if (!fileData) {
      addLog('Error: No firmware file selected');
      return;
    }

    if (!('serial' in navigator)) {
      addLog('Error: Web Serial API not supported in this browser. Please use Chrome/Edge on Desktop.');
      return;
    }

    setIsFlashing(true);
    setLogs([]);
    addLog('Connecting to ESP32 over Web Serial USB...');

    try {
      const serial = (navigator as unknown as { serial: { requestPort: () => Promise<unknown> } }).serial;
      const port = await serial.requestPort();

      const transport = new Transport(port as never);
      const espLoader = new ESPLoader({
        transport,
        baudrate: 921600,
        terminal: {
          clean: () => setLogs([]),
          writeLine: (data: string) => addLog(data),
          write: (data: string) => addLog(data),
        },
      });

      addLog('Syncing with ESP32 ROM bootloader...');
      const chip = await espLoader.main();
      addLog(`Connected to: ${chip || 'ESP32'}`);

      addLog('Flashing firmware at offset 0x10000 (app0 partition)...');
      const fileArray = [{ data: fileData, address: 0x10000 }];

      await espLoader.writeFlash({
        fileArray,
        flashSize: 'keep',
        flashMode: 'keep',
        flashFreq: 'keep',
        eraseAll: false,
        compress: true,
        reportProgress: (_fileIndex: number, written: number, total: number) => {
          const pct = Math.round((written / total) * 100);
          addLog(`Flashing progress: ${pct}% (${written}/${total} bytes)`);
        },
      });

      addLog('Flashing complete! Resetting ESP32...');
      await espLoader.softReset(false);
      await transport.disconnect();
      addLog('ESP32 rebooted into new firmware successfully.');
    } catch (err: unknown) {
      console.error('[WebUSB Flasher] Error:', err);
      addLog(`Error: ${err instanceof Error ? err.message : 'USB flashing failed'}`);
    } finally {
      setIsFlashing(false);
    }
  };

  return (
    <Card className="overflow-hidden border-border/80 shadow-md">
      <div className="border-b border-border/60 bg-muted/30 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-control bg-brand/10 text-brand">
            <Usb className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">
              WebUSB / WebSerial Direct Cable Flashing
            </h3>
            <p className="text-xs text-muted-foreground">
              Flash firmware directly via USB-C cable in Chrome/Edge without installing Python or PlatformIO
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {!isSupported ? (
          <div className="flex items-center gap-3 rounded-control bg-warning/10 p-4 text-xs font-medium text-warning">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p>
              Web Serial is not supported in this browser. Please open this page in <strong>Google Chrome</strong>, <strong>Microsoft Edge</strong>, or <strong>Opera</strong> on desktop.
            </p>
          </div>
        ) : (
          <>
            {/* File Selector */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                'group relative flex cursor-pointer flex-col items-center justify-center rounded-card border border-dashed p-6 text-center transition-all',
                file
                  ? 'border-brand/50 bg-brand/5'
                  : 'border-border/80 hover:border-brand/40 hover:bg-muted/30'
              )}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".bin"
                onChange={handleFileSelect}
                className="hidden"
                disabled={isFlashing}
              />
              <div className="flex h-12 w-12 items-center justify-center rounded-control bg-brand/10 text-brand transition-transform group-hover:scale-105">
                <FileCode className="h-6 w-6" />
              </div>
              {file ? (
                <div className="mt-3">
                  <p className="text-sm font-semibold text-foreground">{file.name}</p>
                  <p className="text-xs text-muted-foreground font-mono mt-0.5">
                    {(file.size / 1024).toFixed(1)} KB · Ready to flash via USB
                  </p>
                </div>
              ) : (
                <div className="mt-3">
                  <p className="text-sm font-medium text-foreground">
                    Click to select <span className="font-semibold text-brand">firmware.bin</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Select firmware image to burn directly over USB
                  </p>
                </div>
              )}
            </div>

            {/* Terminal Log Console */}
            {logs.length > 0 && (
              <div className="rounded-control border border-border/60 bg-neutral-950 p-4 font-mono text-xs text-neutral-200">
                <div className="flex items-center gap-2 border-b border-neutral-800 pb-2 text-neutral-400">
                  <Terminal className="h-3.5 w-3.5" />
                  <span>Flashing Terminal Log</span>
                </div>
                <div className="mt-2 max-h-40 overflow-y-auto space-y-1">
                  {logs.map((log, idx) => (
                    <div key={idx} className="leading-relaxed">
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end gap-3">
              <Button
                onClick={handleFlashUsb}
                disabled={!fileData || isFlashing}
                className="bg-brand hover:bg-brand text-white shadow-sm"
              >
                <Zap className="mr-2 h-4 w-4" />
                {isFlashing ? 'Flashing via USB...' : 'Flash Firmware via USB'}
              </Button>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}
