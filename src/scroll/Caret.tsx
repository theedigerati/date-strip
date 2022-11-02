interface Props {
  disabled: boolean;
  position: "left" | "right";
  onClick: () => void;
}

const Caret = ({ disabled, position, onClick }: Props) => {
  return (
    <button
      className={"caret " + (disabled ? "disabled" : "")}
      style={{ marginRight: 10 }}
      disabled={disabled}
      onClick={() => onClick()}
    >
      <svg
        stroke={disabled ? "rgba(0,0,0, .4)" : "rgb(0, 105, 255)"}
        fill={disabled ? "rgba(0,0,0, .4)" : "rgb(0, 105, 255)"}
        strokeWidth="0"
        viewBox="0 0 512 512"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        {position === "left" && (
          <path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z"></path>
        )}
        {position === "right" && (
          <path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path>
        )}
      </svg>
    </button>
  );
};

export default Caret;
