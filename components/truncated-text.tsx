import React from 'react';

const TruncatedText = ({ text = '', maxLength }: { text: string; maxLength: number }) => {
  const isTruncated = text.length > maxLength;
  const truncatedText = isTruncated ? `${text.slice(0, maxLength)}...` : text;

  return (
    <div className="group relative z-10">
      <p className={`truncate`}>{truncatedText}</p>
      {isTruncated && <span className="absolute z-50 bottom-full whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-90 bg-black rounded-lg py-1 px-3">{text}</span>}
    </div>
  );
};

export default TruncatedText;
