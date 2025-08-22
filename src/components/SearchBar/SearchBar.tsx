import { useState, type ChangeEvent, type MouseEvent } from 'react';

interface SearchBarProps {
  handleSearchTextChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar = ({ handleSearchTextChange }: SearchBarProps) => {
  const [isMouseInInput, setIsMouseInInput] = useState(false);

  const handleMouseEvent = (e: MouseEvent<HTMLLabelElement>) => {
    if (!['mouseenter', 'mouseleave'].includes(e.type)) return;
    if (e.type === 'mouseenter') {
      setIsMouseInInput(true);
      return;
    }
    setIsMouseInInput(false);
  };

  return (
    <label
      className="relative w-full"
      onMouseEnter={handleMouseEvent}
      onMouseLeave={handleMouseEvent}
    >
      <input
        onChange={handleSearchTextChange}
        placeholder="Ask about any location"
        className={`${isMouseInInput && 'opacity-50'} opacity-30 relative w-[65%] rounded-4xl mx-10 py-2 px-8 hover:shadow-sm focus:shadow-sm focus:outline-none mb-10 bg-white`}
      />
      <div
        className={`${isMouseInInput && 'visible'} invisible absolute right-15 top-1/2 transform -translate-y-1/2 text-gray-500 z-10`}
      >
        &#128269;
      </div>
    </label>
  );
};
