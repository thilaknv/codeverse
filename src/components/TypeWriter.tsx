import { useTypewriter, Cursor } from "react-simple-typewriter";

const TypeWriter = () => {
  const [text] = useTypewriter({
    words: ["learn problem solving.", "prepare for coding interviews."],
    loop: 100,
    typeSpeed: 100,
    deleteSpeed: 10,
  });
  return (
    <strong>
      {text}
      <Cursor />
    </strong>
  );
};

export default TypeWriter;
