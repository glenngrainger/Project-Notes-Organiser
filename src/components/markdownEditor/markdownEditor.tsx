import EasyMDE from "easymde";
import { useCallback, useEffect, useRef } from "react";

// const easyMDE = new EasyMDE({
//   element: document.getElementById("my-text-area"),
// });

const MarkDownEditor = ({
  notesValue,
}: {
  notesValue: (value: string) => void;
}) => {
  let easyMDEElement = useRef<EasyMDE | undefined>();

  // If is saving, set the value?

  const onChangeHandler = useCallback(() => {}, []);

  useEffect(() => {
    if (!easyMDEElement.current) {
      easyMDEElement.current = new EasyMDE({ element: easyMDEElement.current });
      //   easyMDEElement.current.value("test");
      easyMDEElement.current.codemirror.on("change", onChangeHandler);
    }

    // notesValue(easyMDEElement?.current?.value() || "");

    return () => {
      easyMDEElement.current?.cleanup;
      easyMDEElement.current = undefined;
    };
  }, []);

  return <textarea ref={easyMDEElement}></textarea>;
};
export default MarkDownEditor;
