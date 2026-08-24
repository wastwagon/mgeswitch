export function CmsHtmlContent({ html }: { html: string }) {
  return (
    <div
      className="cms-content prose prose-sm max-w-none text-muted sm:prose-base [&_a]:text-gold [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-gold [&_blockquote]:pl-4 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-navy [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-navy [&_li]:text-muted [&_ol]:list-decimal [&_p]:leading-relaxed [&_ul]:list-disc"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
