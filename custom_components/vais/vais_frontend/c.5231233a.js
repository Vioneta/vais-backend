import { an as e, ao as a, ai as s, ap as r, aq as i } from './main-2af83765.js'
async function u(u, o, n) {
  const t = new e('updateLovelaceResources'),
    l = await a(u),
    c = `/vaisfiles/${o.full_name.split('/')[1]}`,
    d = s({ repository: o, version: n }),
    p = l.find((e) => e.url.includes(c))
  t.debug({ namespace: c, url: d, exsisting: p }),
    p && p.url !== d
      ? (t.debug(`Updating exsusting resource for ${c}`),
        await r(u, { url: d, resource_id: p.id, res_type: p.type }))
      : l.map((e) => e.url).includes(d) ||
        (t.debug(`Adding ${d} to Lovelace resources`),
        await i(u, { url: d, res_type: 'module' }))
}
export { u }
