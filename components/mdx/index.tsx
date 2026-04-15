import React from "react";
import { Mermaid } from "./mermaid";

// Oggetto mapping per MDXRemote
export const mdxComponents = {
  Mermaid,
  pre: (props: any) => {
    // Check if the pre tag wraps a code tag with mermaid language
    if (React.isValidElement(props.children) && props.children.type === 'code') {
      const codeProps = props.children.props as any;
      if (codeProps.className === "language-mermaid") {
        // MDX puts a trailing newline normally, mermaid likes it clean
        return <Mermaid chart={codeProps.children as string} />;
      }
    }
    // Default pre styling
    return (
      <pre 
        {...props} 
        className={props.className || "bg-[#0d1117] border border-border/50 rounded-xl p-4 overflow-x-auto my-6 text-sm"} 
      />
    );
  },
  code: (props: any) => {
    // Inline code parsing if there's no language class
    if (!props.className) {
      return (
        <code className="px-1.5 py-0.5 rounded-md bg-primary/10 text-primary font-mono text-[0.875em]" {...props}>
          {props.children}
        </code>
      );
    }
    return <code {...props} />;
  }
};
