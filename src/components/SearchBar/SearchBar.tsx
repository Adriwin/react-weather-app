import { useState, type ChangeEvent, type MouseEvent } from 'react';

interface SearchBarProps {
  handleSearchTextChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isPending?: boolean;
}

export const SearchBar = ({
  handleSearchTextChange,
  isPending,
}: SearchBarProps) => {
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
      className="relative"
      onMouseEnter={handleMouseEvent}
      onMouseLeave={handleMouseEvent}
    >
      <input
        onChange={handleSearchTextChange}
        placeholder="Ask about any location"
        className={`${isMouseInInput && 'opacity-50'} relative mb-10 rounded-4xl
          bg-white px-8 py-2 text-center opacity-30 hover:shadow-sm
          focus:shadow-sm focus:outline-none
          ${isPending ? 'w-full' : 'w-[80%] md:w-[90%] lg:mx-10 lg:w-[65%]'}`}
      />
      <div
        className={` ${isMouseInInput && 'visible'} invisible absolute
          text-gray-500 ${
            isPending
              ? 'top-1/6 right-5 z-10 -translate-y-1/6 transform'
              : 'top-1/2 right-15 z-10 -translate-y-1/2 transform'
          }`}
      >
        &#128269;
      </div>
    </label>
  );
};
