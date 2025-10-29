import { TreeItem } from '@/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

/**
 * Convert a record of files to trace tree structure.
 * @param files - record of file paths to content
 * @returns Tree structure for TreeView Component
 *
 * @example
 * Input: {"src/Button.tsx": "...", "README.md": "..."}
 * Output: {["src", "Button.tsx"], "README.md"}
 */
export function convertFilesToTreeItems(files: {
   [path: string]: string;
}): TreeItem[] {
   interface TreeNode {
      [key: string]: TreeNode | null;
   }

   const tree: TreeNode = {};
   const shortedPaths = Object.keys(files).sort();

   for (const filePath of shortedPaths) {
      const parts = filePath.split('/');
      let current = tree;
      for (let i = 0; i < parts.length - 1; i++) {
         const part = parts[i];
         if (!current[part]) {
            current[part] = {};
         }
         current = current[part];
      }

      const fileName = parts[parts.length - 1];
      current[fileName] = null;
   }

   function convertNode(node: TreeNode, name?: string): TreeItem[] | TreeItem {
      const entries = Object.entries(node);
      if (entries.length === 0) return name || '';
      const children: TreeItem[] = [];

      for (const [key, value] of entries) {
         if (value === null) {
            children.push(key);
         } else {
            const SubTree = convertNode(value, key);
            if (Array.isArray(SubTree)) {
               children.push([key, ...SubTree]);
            } else {
               children.push([key, SubTree]);
            }
         }
      }
      return children;
   }

   const result = convertNode(tree);
   return Array.isArray(result) ? result : [result];
}
