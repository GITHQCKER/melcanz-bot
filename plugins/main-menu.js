let fs = require('fs')
let path = require('path')
let moment = require('moment-timezone')
let thumbnail = fs.readFileSync('./src/7ZZUlwdgRuyy5h80gI9A_0oNs5EnxhYD0VjNn.png')
const defaultMenu = {
  before: `
%readmore`.trimStart(),
  header: '■「 *%category* 」',
  body: '├ %cmd %islimit %isPremium',
  footer: '└────\n',
  after: `
`,
}
let handler = async (m, { conn, usedPrefix: _p, text, isOwner, command }) => {
  try {
// Fake troli
    const reply = {
    key: {
        participant: '0@s.whatsapp.net'
    },
    message: {
        orderMessage: {
            itemCount: 2022,
            itemCoun: 404,
            surface: 404,
            message: `I Am ${conn.user.name}`,
            orderTitle: 'B',
            thumbnail: thumbnail,
            sellerJid: '0@s.whatsapp.net'
        }
    }
}

    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
    let { exp, limit, registered, name } = global.db.data.users[m.sender]
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let tags
    let teks = `${text}`.toLowerCase()
    /**
     * arrayMenu
     * @param {Array} 
     * kalo ga ada didaftar ini ga bisa dipanggil, jadi harus diisi
     */
    let arrayMenu = ['list', 'all', 'absen', 'audio', 'database', 'download', 'fun', 'dewasa', 'maker', 'grup', 'games', 'info', 'internet', 'jadibot', 'kerang ajaib', 'nulis', 'stiker', 'tools', 'tanpa kategori', 'xp', 'owner']
    if (!arrayMenu.includes(teks)) teks = 'list' // kalo teks da ada di arrayMenu maka bakal nampilin list
    // buat 1 per 1 sesuai yang ada di arrayMenu
    if (teks == 'all') tags = {
      'main': 'Main',
      'absen': 'Absen',
      'audio': 'Pengubah Suara',
      'database': 'Database',
      'download': 'Downloader',
      'fun': 'Fun',
      'maker': 'Maker Menu',
      'game': `Games`,
      'group': 'Group',
      'info': 'Info',
      'internet': 'Internet',
      'jadibot': 'Jadibot',
      'kerang': 'Kerang Ajaib',
      'nulis': 'Nulis',
      'sticker': 'Sticker',
      'tools': 'Tools',
      'vote': 'Voting',
      'xp': 'Exp & Limit',
      '': 'Tanpa Kategori',
    }
    if (teks == 'absen') tags = {
      'absen': 'Absen',
      'vote': 'Voting',
    }
    if (teks == 'audio') tags = {
      'audio': 'Pengubah Suara'
    }
    if (teks == 'grup') tags = {
      'group': 'Group'
    }
    if (teks == 'database') tags = {
      'database': 'Database'
    }
    if (teks == 'download') tags = {
      'download': 'Downloader',
    }
    if (teks == 'fun') tags = {
      'fun': 'Fun',
    }
        if (teks == 'dewasa') tags = {
      'dewasa': 'EN ES EF WE',
    }
    if (teks == 'maker') tags = {
      'maker': 'Maker',
    }
    if (teks == 'games') {
      if (!db.data.settings[conn.user.jid].game) {
        await conn.sendButton(m.chat, 'Game belum diaktifkan oleh owner!', wm, 'Chat Owner', '.owner', m)
        throw 0
      }
      tags = {
        'game': 'Games'
      }
    }
    if (teks == 'info') tags = {
      'info': 'Info'
    }
    if (teks == 'internet') tags = {
      'internet': 'Internet'
    }
    if (teks == 'jadibot') {
      if (!db.data.settings[conn.user.jid].jadibot) {
        await conn.sendButton(m.chat, 'Jadibot belum diaktifkan oleh owner!', wm, 'Chat Owner', '.owner', m)
        throw 0
      }
      tags = {
        'jadibot': 'Multi Session'
      }
    }
    if (teks == 'kerang ajaib') tags = {
      'kerang': 'Kerang Ajaib',
    }
    if (teks == 'nulis') tags = {
      'nulis': 'Nulis',
    }
    if (teks == 'stiker') tags = {
      'sticker': 'Stiker',
    }
    if (teks == 'tools') tags = {
      'tools': 'Tools'
    }
    if (teks == 'xp') tags = {
      'xp': 'Exp & Limit'
    }
    if (teks == 'tanpa kategori') tags = {
      '': 'No Category'
    }
    if (teks == 'owner') {
      if (!isOwner) {
        await conn.sendButton(m.chat, 'This Menu Is Only For Owner!!', wm, 'Back To Menu', '.menu', m)
        throw 0
      }
      tags = {
        'owner': 'Owner',
        'host': 'Host',
        'advanced': 'Eval'
      }
    }
    if (teks == 'list') { // kalo teks ga sesuai arrayMenu bakal nampilin ini
      let { isBusiness } = conn.isOnWhatsApp(conn.user.jid) // bot wa bisnis?
      let arrayMenuFilter = arrayMenu.filter(v => !['list'].includes(v))
      if (isBusiness) {
        return m.reply(`
❏「 Menu Bot」\n${arrayMenuFilter.map(v => '├ ' + _p + command + ' ' + v).join`\n`}
  └────
  `.trim())
      }
      else {
        let array = Object.keys(arrayMenuFilter).map(v => ({
          title: `🌹 ${arrayMenuFilter[v].toUpperCase()} MENU`,
          description: `🍃${arrayMenuFilter[v]} features`,
          rowId: `.m ${arrayMenuFilter[v]}`
        }))
        let button = {
          buttonText: 'Click Here',
          description: `Hello @${m.sender.split`@`[0]}, click 'Click Here' to see list of all commands/features`,
          title: 'menu'
        }
        return conn.sendListM(m.chat, button, array, reply)
        // (reply) Fake troli:v
      }
    }
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Presented by @${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '(Limit)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Premium)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.user.name,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    await conn.send2ButtonLoc(m.chat, fla + encodeURIComponent(ucapan()), text.trim(), `Napa mau baca`, 'Developer', '.owner', 'Speed', '.ping')
  } catch (e) {
    // conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
handler.help = ['menu']
handler.tags = ['main']
handler.command = /^(m|menu|help|\?)$/i

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  res = "tidur banh, i love u"
  if (time >= 4) {
    res = "GOOD MORNING"
  }
  if (time > 10) {
    res = "GOOD MORNING"
  }
  if (time >= 15) {
    res = "GOOD afternoon"
  }
  if (time >= 18) {
    res = "GOOD Night"
  }
  return res
}
