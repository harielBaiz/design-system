export interface EmojiCategory { id: string; label: string; icon: string; emojis: [string, string][] }

/** A small built-in set (emoji and search keywords). Pass `categories` to EmojiPicker to use your own. */
export const EMOJI_CATEGORIES: EmojiCategory[] = [
  { id: 'smileys', label: 'Smileys', icon: '😀', emojis: [
    ['😀', 'grinning happy'], ['😃', 'smile open'], ['😄', 'smile eyes'], ['😁', 'beaming grin'], ['😆', 'laughing'], ['😅', 'sweat smile'], ['😂', 'joy tears laugh'], ['🙂', 'slight smile'],
    ['😉', 'wink'], ['😊', 'blush'], ['😍', 'heart eyes love'], ['😘', 'kiss'], ['😎', 'cool sunglasses'], ['🤔', 'thinking'], ['😐', 'neutral'], ['🙄', 'eye roll'],
    ['😴', 'sleeping'], ['😢', 'cry sad'], ['😭', 'sob'], ['😡', 'angry'], ['🤯', 'mind blown'], ['🥳', 'party'], ['😱', 'scream'], ['🤗', 'hug'],
  ] },
  { id: 'people', label: 'People', icon: '👋', emojis: [
    ['👋', 'wave hello'], ['👍', 'thumbs up yes'], ['👎', 'thumbs down no'], ['👏', 'clap'], ['🙌', 'raised hands'], ['🙏', 'pray thanks please'], ['💪', 'strong muscle'], ['🤝', 'handshake deal'],
    ['✌️', 'peace victory'], ['🤞', 'fingers crossed'], ['👀', 'eyes look'], ['🧠', 'brain'], ['👤', 'person user'], ['👥', 'people team'], ['🧑‍💻', 'developer coder'], ['🧑‍🎨', 'artist designer'],
  ] },
  { id: 'nature', label: 'Nature', icon: '🌿', emojis: [
    ['🌵', 'cactus'], ['🌳', 'tree'], ['🌿', 'herb leaf'], ['🍀', 'clover luck'], ['🌸', 'blossom flower'], ['🌻', 'sunflower'], ['🌈', 'rainbow'], ['☀️', 'sun'],
    ['🌙', 'moon'], ['⭐', 'star'], ['🔥', 'fire hot'], ['💧', 'drop water'], ['❄️', 'snow cold'], ['⚡', 'lightning bolt'], ['🐶', 'dog'], ['🐱', 'cat'],
  ] },
  { id: 'food', label: 'Food', icon: '🍕', emojis: [
    ['🍎', 'apple'], ['🍌', 'banana'], ['🍓', 'strawberry'], ['🍕', 'pizza'], ['🍔', 'burger'], ['🌮', 'taco'], ['🍣', 'sushi'], ['🍩', 'donut'],
    ['🍪', 'cookie'], ['🎂', 'cake birthday'], ['☕', 'coffee'], ['🍵', 'tea'], ['🍺', 'beer'], ['🍷', 'wine'], ['🧉', 'mate'], ['🥩', 'steak asado'],
  ] },
  { id: 'activity', label: 'Activities', icon: '⚽', emojis: [
    ['⚽', 'soccer football'], ['🏀', 'basketball'], ['🎾', 'tennis'], ['🏆', 'trophy win'], ['🥇', 'gold medal first'], ['🎯', 'target bullseye'], ['🎮', 'game controller'], ['🎲', 'dice'],
    ['🎵', 'music note'], ['🎸', 'guitar'], ['🎨', 'palette art'], ['🎬', 'movie clapper'], ['📚', 'books'], ['🚴', 'cycling bike'], ['🏊', 'swim'], ['🧩', 'puzzle'],
  ] },
  { id: 'objects', label: 'Objects', icon: '💡', emojis: [
    ['💡', 'idea light bulb'], ['💻', 'laptop computer'], ['📱', 'phone'], ['⌨️', 'keyboard'], ['🖱️', 'mouse'], ['📷', 'camera'], ['🔒', 'lock'], ['🔑', 'key'],
    ['📌', 'pin'], ['📎', 'paperclip'], ['✏️', 'pencil'], ['📝', 'memo note'], ['📅', 'calendar'], ['📈', 'chart up growth'], ['🔔', 'bell notification'], ['🧰', 'toolbox'],
  ] },
  { id: 'symbols', label: 'Symbols', icon: '❤️', emojis: [
    ['❤️', 'heart love red'], ['🧡', 'orange heart'], ['💛', 'yellow heart'], ['💚', 'green heart'], ['💙', 'blue heart'], ['💜', 'purple heart'], ['✅', 'check done yes'], ['❌', 'cross no'],
    ['⚠️', 'warning'], ['❓', 'question'], ['❗', 'exclamation'], ['💯', 'hundred'], ['✨', 'sparkles'], ['🚀', 'rocket launch'], ['🎉', 'tada party celebrate'], ['➕', 'plus add'],
  ] },
];
