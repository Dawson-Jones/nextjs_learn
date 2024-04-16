## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

// 来自于 Claude...  
在 Next.js 13 中，你可以通过以下几种方式区分客户端组件和服务器端组件:

1. **文件位置**

- 位于 `app` 目录下的 React 组件被视为服务器端组件。
- 位于 `app/components` 目录下的 React 组件被视为客户端组件。

2. **文件扩展名**

- 使用 `.jsx` 或 `.tsx` 扩展名的文件被视为客户端组件。
- 使用 `.js` 或 `.ts` 扩展名的文件被视为服务器端组件。

3. **使用 `use client` 指令**

- 在文件顶部添加 `'use client'` 指令可以将该文件标记为客户端组件，无论它位于哪个目录。
- 省略 `'use client'` 指令会将该文件视为服务器端组件。

4. **导入方式**

- 从 `'react'` 导入表示该组件是客户端组件。
- 从其他模块导入表示该组件是服务器端组件。

5. **组件功能**

- 服务器端组件无法使用浏览器 API（如 `window`、`document`）或事件处理程序（如 `onClick`）。
- 客户端组件可以使用浏览器 API 和事件处理程序。

总的来说，Next.js 13 通过约定优于配置的方式来区分客户端组件和服务器端组件。这种区分有助于更好地分离职责，提高性能和安全性。

在实际开发中，你可以根据组件的功能和需求来决定将其设计为客户端组件还是服务器端组件。一般来说，处理数据获取和渲染的组件应该是服务器端组件，而处理交互和状态管理的组件应该是客户端组件。

## [What is the big deal with "use client"](https://www.reddit.com/r/nextjs/comments/159909e/what_is_the_big_deal_with_use_client/)

- use client  
  The component gets prerendered with SSR or ISR/SSG if possible on the server. The html is send to the client and the javascript is send too. So it gets hydrated on the client and is interactive
- Without use client
  The component gets executed on the server and the resulting html or data is embedded into the html as json format so the react renderer can render it. Its js is NOT send to the client so it does not get hydrated, (only rendered from its json presentation) and is therefore not interactive

我理解是:

- 如果使用了 use client, 那么意味着有些东西要在客户端执行, 所以需要发送 js.
- 如果没有使用 use client, 那么服务端可以直接渲染好
use client is not a hook, but a directive used by Next.js pages and components to determine whether the React element is supposed to be rendered on the client or server.
