import EasyMDE from "easymde";
import { useCallback, useEffect, useRef, useState } from "react";
import { useGeneral } from "../../store/generalStore";

const MarkDownEditor = () => {
  //     const [domNode, setDomNode] = useState(null);
  // const onRefChange = useCallback(node => {
  //   setDomNode(node); // trigger re-render on changes
  //   // ...
  // }, []);
  const { setEditingNoteData, editingNoteData, isCreatingNote } = useGeneral();
  let easyMDEElement = useRef<EasyMDE | undefined>();
  //   let value = useRef("");

  // If is saving, set the value?

  const onChangeHandler = useCallback(() => {
    const value = easyMDEElement.current?.value() || "";
    console.log(value);
    console.log(editingNoteData);
    setEditingNoteData("content", value);
  }, []);

  useEffect(() => {
    if (!easyMDEElement.current) {
      easyMDEElement.current = new EasyMDE({ element: easyMDEElement.current });
      easyMDEElement.current.codemirror.on("change", onChangeHandler);
    }

    return () => {
      easyMDEElement.current?.cleanup;
      easyMDEElement.current = undefined;
      document.querySelectorAll(".EasyMDEContainer").forEach((x) => x.remove());
    };
  }, [isCreatingNote]);

  return <textarea ref={easyMDEElement}></textarea>;
};
export default MarkDownEditor;
