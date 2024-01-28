import markdown from '../assets/markdown.png'
import lockfile from '../assets/lock.png'
import Json from '../assets/json.png'
import git from '../assets/git.png'
import html from '../assets/html.png'
import rust from '../assets/rust.png'
import image from '../assets/image.png'
import svg from '../assets/svg.png'
import css from '../assets/css.png'
import react from '../assets/react.png'
import typescript from '../assets/typescript.png'
import javascript from '../assets/javascript.png'
import binary from '../assets/binary.png'

interface Icons {
  [key: string]: string
}

const icons: Icons = {
  tsx: react,
  css: css,
  svg: svg,
  png: image,
  icns: image,
  ico: image,
  gif: image,
  jpeg: image,
  jpg: image,
  tiff: image,
  bmp: image,
  ts: typescript,
  js: javascript,
  json: Json,
  md: markdown,
  lock: lockfile,
  gitignore: git,
  html: html,
  rs: rust,
};

interface IFileIconProps {
  name: string;
  size?: 'sm' | 'base'
}

export default function FileIcon({ name, size = 'base' }: IFileIconProps) {
  const lastDotIndex = name.lastIndexOf('.')
  const ext = lastDotIndex !== -1 ? name.slice(lastDotIndex + 1).toLowerCase() : 'NONE'
  const cls = size === 'base' ? 'w-4' : 'w-3';

  if (icons[ext]) {
    return <img className={cls} src={icons[ext]} alt={name} />
  }

  return <img className={cls} src={binary} alt={name} />
}
