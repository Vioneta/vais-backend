import { m as o } from './c.d0af35b1.js'
import { a as t } from './c.51f71dd4.js'
const n = async (n, s) =>
  t(n, {
    title: 'Home Assistant Community Store',
    confirmText: s.localize('common.close'),
    text: o.html(
      `\n  **${s.localize('dialog_about.integration_version')}:** | ${
        s.configuration.version
      }\n  --|--\n  **${s.localize(
        'dialog_about.frontend_version'
      )}:** | 20220514073057\n  **${s.localize('common.repositories')}:** | ${
        s.repositories.length
      }\n  **${s.localize('dialog_about.downloaded_repositories')}:** | ${
        s.repositories.filter((o) => o.installed).length
      }\n\n  **${s.localize(
        'dialog_about.useful_links'
      )}:**\n\n  - [General documentation](https://vais.xyz/)\n  - [Configuration](https://vais.xyz/docs/configuration/start)\n  - [FAQ](https://vais.xyz/docs/faq/what)\n  - [GitHub](https://github.com/vais)\n  - [Discord](https://discord.gg/apgchf8)\n  - [Become a GitHub sponsor? β€οΈ](https://github.com/sponsors/ludeeus)\n  - [BuyMe~~Coffee~~Beer? πΊπ](https://buymeacoffee.com/ludeeus)\n\n  ***\n\n  _Everything you find in VAIS is **not** tested by Home Assistant, that includes VAIS itself.\n  The VAIS and Home Assistant teams do not support **anything** you find here._`
    ),
  })
export { n as s }
