import { ReactNode } from "react"

interface MarkdownContentProps {
  content: string
  className?: string
}

export function MarkdownContent({ content, className = "" }: MarkdownContentProps) {
  // Enhanced markdown-to-HTML conversion for the content
  const formatContent = (text: string): string => {
    return text
      // Headers with better styling
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mt-8 mb-4 text-foreground border-l-4 border-primary pl-4 bg-muted/30 py-2 rounded-r-lg">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-10 mb-6 text-foreground pb-2 border-b border-border">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-12 mb-8 text-foreground">$1</h1>')
      
      // Bold text with better styling
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
      
      // Enhanced lists with better spacing and bullets
      .replace(/^- \*\*(.*?)\*\*: (.*$)/gim, '<li class="ml-6 mb-3 flex items-start"><span class="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span><div><strong class="font-semibold text-foreground">$1:</strong> <span class="text-muted-foreground">$2</span></div></li>')
      .replace(/^- (.*$)/gim, '<li class="ml-6 mb-2 flex items-start"><span class="inline-block w-1.5 h-1.5 bg-primary rounded-full mt-2.5 mr-3 flex-shrink-0"></span><span class="text-muted-foreground">$1</span></li>')
      
      // Numbered lists
      .replace(/^\d+\. \*\*(.*?)\*\*: (.*$)/gim, '<li class="ml-6 mb-3 flex items-start"><span class="inline-flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground rounded-full text-sm font-medium mr-3 flex-shrink-0 mt-0.5">•</span><div><strong class="font-semibold text-foreground">$1:</strong> <span class="text-muted-foreground">$2</span></div></li>')
      .replace(/^\d+\. (.*$)/gim, '<li class="ml-6 mb-2 flex items-start"><span class="inline-flex items-center justify-center w-5 h-5 bg-muted text-muted-foreground rounded-full text-xs font-medium mr-3 flex-shrink-0 mt-1">•</span><span class="text-muted-foreground">$1</span></li>')
      
      // Code blocks with syntax highlighting simulation
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<div class="my-6"><div class="bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground border-b border-border rounded-t-lg">$1</div><pre class="bg-muted p-4 rounded-b-lg overflow-x-auto border border-border border-t-0"><code class="text-sm font-mono text-foreground whitespace-pre">$2</code></pre></div>')
      
      // Inline code with better styling
      .replace(/`([^`]+)`/g, '<code class="bg-muted px-2 py-1 rounded text-sm font-mono text-foreground border">$1</code>')
      
      // Paragraphs with better spacing and typography
      .replace(/^(?!<[h1-6]|<li|<\/li>|<div|<pre)(.*$)/gim, '<p class="mb-4 leading-relaxed text-muted-foreground">$1</p>')
      
      // Clean up empty paragraphs and fix nested elements
      .replace(/<p[^>]*><\/p>/g, '')
      .replace(/<p[^>]*>\s*<\/p>/g, '')
      .replace(/<p([^>]*)>(\s*<(h[1-6]|div|pre|ul|ol|li)[^>]*>.*?<\/\3>\s*)<\/p>/g, '$2')
      
      // Wrap consecutive list items in ul tags
      .replace(/(<li[^>]*>.*?<\/li>\s*)+/g, (match) => `<ul class="space-y-1 mb-6">${match}</ul>`)
      
      // Add section dividers for major headings
      .replace(/(<h2[^>]*>.*?<\/h2>)/g, '<div class="mt-12 mb-8">$1</div>')
  }

  return (
    <div 
      className={`prose prose-neutral dark:prose-invert max-w-none ${className}`}
      dangerouslySetInnerHTML={{ 
        __html: formatContent(content) 
      }} 
    />
  )
} 