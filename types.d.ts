declare module '*.vue' {
  import type { Component } from 'vue';
  const component: Component;
  export default component;
}

declare module '*.md' {
  import component from '*.vue';
  export default component;
}

declare module 'virtual:manifest' {
  export const manifest: Directory[]
}

type Directory = {
  level: number,
  name: string,
  articles: {
    title: string,
    tags: string[],
    href: string,
    authorDate: string,
    order: number,
  }[]
}
