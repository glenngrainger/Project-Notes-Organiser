import EasyMDE from "easymde";
import { useCallback, useEffect, useRef, useState } from "react";
import { useGeneral } from "../../store/generalStore";

const MarkDownEditor = () => {
  const {
    setEditingNoteData,
    editingNoteData,
    isCreatingNote,
    selectedNoteId,
  } = useGeneral();
  let easyMDEElement = useRef<EasyMDE | null>(null);

  const onChangeHandler = useCallback(() => {
    const value = easyMDEElement.current?.value() || "";
    console.log(value);
    console.log(editingNoteData);
    setEditingNoteData("content", value);
  }, []);

  useEffect(() => {
    if (!easyMDEElement.current) {
      easyMDEElement.current = new EasyMDE({
        element: easyMDEElement.current,
        minHeight: "500px",
      });
      easyMDEElement.current.codemirror.on("change", onChangeHandler);
      easyMDEElement.current.value(editingNoteData?.content || "");
    }

    return () => {
      easyMDEElement.current?.cleanup;
      easyMDEElement.current = null;
      document.querySelectorAll(".EasyMDEContainer").forEach((x) => x.remove());
    };
  }, [isCreatingNote, selectedNoteId]);

  return <textarea ref={easyMDEElement}></textarea>;
};
export default MarkDownEditor;
