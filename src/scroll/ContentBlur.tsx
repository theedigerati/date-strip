interface Props {
  position: "left" | "right";
}

const ContentBlur = ({ position }: Props) => {
  return (
    <div
      style={{
        position: "absolute",
        left: position === "left" ? 0 : "unset",
        right: position === "right" ? 0 : "unset",
        top: 0,
        height: "100%",
        width: 30,
        background: `linear-gradient(to ${position}, transparent, rgb(255,255,255))`,
        zIndex: 2
      }}
    ></div>
  );
};

export default ContentBlur;
