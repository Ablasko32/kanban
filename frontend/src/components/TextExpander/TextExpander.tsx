import { useState } from "react";
import { HiOutlineArrowSmDown, HiOutlineArrowSmUp } from "react-icons/hi";

const MAX_SIZE: number = 50;

const TextExpander = ({
  text,
  classNameText,
  classNameButton,
}: {
  text: string;
  classNameText?: string;
  classNameButton?: string;
}) => {
  const [showAll, setShowAll] = useState<boolean>(false);

  const displayText = showAll ? text : text.slice(0, MAX_SIZE);

  return (
    <div>
      <p className={`${classNameText ? classNameText : ""}`}>{displayText}</p>
      {text.length > MAX_SIZE && (
        <>
          {!showAll ? "..." : ""}
          <button
            className={`${classNameButton ? classNameButton : ""}`}
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? (
              <p>
                Show more
                <HiOutlineArrowSmDown />
              </p>
            ) : (
              <p>
                Show less <HiOutlineArrowSmUp />
              </p>
            )}
          </button>
        </>
      )}
    </div>
  );
};

export default TextExpander;
