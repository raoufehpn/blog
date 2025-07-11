import type { Block } from '@/types';

interface PortableTextProps {
  value: Block[];
}

export function PortableText({ value }: PortableTextProps) {
  if (!value) return null;

  return (
    <div>
      {value.map((block) => {
        if (block._type !== 'block' || !block.children) {
          return null;
        }

        const content = block.children.map((span) => span.text).join('');

        switch (block.style) {
          case 'h1':
            return <h1 key={block._key} className="font-headline">{content}</h1>;
          case 'h2':
            return <h2 key={block._key} className="font-headline">{content}</h2>;
          case 'h3':
            return <h3 key={block._key} className="font-headline">{content}</h3>;
          case 'h4':
            return <h4 key={block._key} className="font-headline">{content}</h4>;
          case 'blockquote':
            return <blockquote key={block._key}>{content}</blockquote>;
          default:
            return <p key={block._key}>{content}</p>;
        }
      })}
    </div>
  );
}
