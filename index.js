const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client();

let presos = {};
let ditador = null;
let contadorMensagens = 0;

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('☠️ BOT DO CAOS SOCIAL ONLINE ☠️');
});

client.on('message', async message => {

    if (!message.from.endsWith('@g.us')) return;

    const user = message.author;
    const chat = await message.getChat();
    const members = chat.participants;
    const args = message.body.toLowerCase();

    function randomMember() {
        return members[Math.floor(Math.random() * members.length)].id._serialized;
    }

    contadorMensagens++;

    // 🚔 Sistema de prisão
    if (presos[user] && Date.now() < presos[user]) {
        return message.reply("🚔 Você está preso e não pode usar comandos!");
    }

    if (presos[user] && Date.now() >= presos[user]) {
        delete presos[user];
    }

    // 👑 Ditador
    if (args === '/ditador') {
        ditador = randomMember();
        message.reply(`👑 O novo DITADOR SUPREMO é @${ditador.split('@')[0]}`, {
            mentions: [ditador]
        });
    }

    // 🚔 Banir
    if (args.startsWith('/banir')) {
        if (user !== ditador) return message.reply("❌ Só o Ditador pode prender!");

        const alvo = message.mentionedIds[0];
        if (!alvo) return;

        presos[alvo] = Date.now() + 600000; // 10 minutos

        message.reply(`🚔 @${alvo.split('@')[0]} foi preso por 10 minutos!`, {
            mentions: [alvo]
        });
    }

    // 🔓 Liberar
    if (args.startsWith('/liberar')) {
        if (user !== ditador) return;

        const alvo = message.mentionedIds[0];
        delete presos[alvo];

        message.reply(`🔓 @${alvo.split('@')[0]} foi libertado!`, {
            mentions: [alvo]
        });
    }

    // 📜 Leis aleatórias
    if (args === '/leis') {
        const leis = [
            "É proibido falar 'kkk' 😡",
            "Todos devem elogiar o ditador 👑",
            "Proibido mandar áudio 🎤",
            "Quem falar 'bom dia' será julgado ☀️",
            "Só pode mandar mensagem com emoji 🤡"
        ];

        message.reply("📜 Nova Lei do Grupo:\n\n" + leis[Math.floor(Math.random() * leis.length)]);
    }

    // 🎭 Zoações
    if (args === '/azarado') {
        const alvo = randomMember();
        message.reply(`💀 O azarado do dia é @${alvo.split('@')[0]}`, {
            mentions: [alvo]
        });
    }

    if (args === '/casal') {
        const a = randomMember();
        const b = randomMember();
        message.reply(`💘 Novo casal do grupo:\n@${a.split('@')[0]} ❤️ @${b.split('@')[0]}`, {
            mentions: [a, b]
        });
    }

    if (args === '/corno') {
        const alvo = randomMember();
        message.reply(`🐂 O escolhido do chifre é @${alvo.split('@')[0]}`, {
            mentions: [alvo]
        });
    }

    if (args === '/qi') {
        const qi = Math.floor(Math.random() * 190) + 10;
        message.reply(`🧠 Seu QI é ${qi}`);
    }

    if (args === '/feio') {
        const f = Math.floor(Math.random() * 100);
        message.reply(`🤢 Nível de feiúra: ${f}%`);
    }

    // ☠️ Evento Apocalipse social
    if (contadorMensagens % 30 === 0) {

        const eventos = [
            "🌋 ERUPÇÃO SOCIAL! Todos devem marcar alguém e acusar de traição!",
            "🦠 VÍRUS DO CAOS! A próxima pessoa que falar vira suspeita!",
            "💣 JULGAMENTO! O grupo deve escolher alguém para ser preso!",
            "👻 O Fantasma do Grupo exige um meme imediato!"
        ];

        const evento = eventos[Math.floor(Math.random() * eventos.length)];

        message.reply("☠️ EVENTO DO APOCALIPSE:\n\n" + evento);
    }

});

client.initialize();
