/**
 * Join class names, dropping falsy entries.
 *
 * Deliberately hand-rolled rather than pulling in clsx/tailwind-merge: this is
 * the whole of what the codebase needs, and adding a dependency means touching
 * package.json and package-lock.json, which are the two files most likely to
 * conflict when several people are working on the same branch.
 *
 * Note this does not de-duplicate conflicting Tailwind classes the way
 * tailwind-merge does — put the conditional class last and let the cascade
 * resolve it, or lift the choice into a variant map.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}
