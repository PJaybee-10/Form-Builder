import React, { useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import RenderElement from "../RenderElement/RenderElement";
import { BOX } from "../types";

export function DragLayerContainer({
  t,
  elements,
  addElement,
  removeElement,
  updateElement,
  updateElementOptions,
  undoRemove,
  form,
  setFormData,
}) {
  const [selectedItem, setSelectedItem] = useState(null);

  const addBox = useCallback(
    (el, left, top) => {
      addElement({ ...el, left, top });
    },
    [elements]
  );
  const moveBox = useCallback(
    (el, left, top) => {
      updateElement({ ...el, left, top });
    },
    [elements]
  );

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: BOX,
    drop(item, monitor) {
      if (!elements[item.id]) {
        const delta = monitor.getClientOffset();
        const left = Math.round(delta.x - 50);
        const top = Math.round(delta.y + 20);
        addBox(item, left, top);
      } else {
        const delta = monitor.getDifferenceFromInitialOffset();

        let left = Math.round(item.left + delta.x);
        let top = Math.round(item.top + delta.y);
        moveBox(item, left, top);
      }
      return undefined;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const onKeyDownInsideDragContainer = (e) => {
    let { key, ctrlKey } = e;
    switch (key) {
      case "Delete":
        if (selectedItem) removeElement(selectedItem);
        break;
      case "z":
      case "Z":
        if (ctrlKey) undoRemove();
        break;

      default:
        break;
    }
  };

  const onClickInsideDragContainer = (e) => {
    if (e.target.id === "dragContainer") setSelectedItem(null);
  };

  return (
    <div
      ref={drop}
      className="dragcontainer"
      id="dragContainer"
      tabIndex={0}
      onClick={onClickInsideDragContainer}
      onKeyDown={onKeyDownInsideDragContainer}
    >
      {Object.keys(elements).map((key) => {
        return (
          <RenderElement
            t={t}
            element={elements[key]}
            isSelected={selectedItem && selectedItem.id === key}
            setSelectedItem={setSelectedItem}
            updateElementOptions={updateElementOptions}
            form={form}
            setFormData={setFormData}
          />
        );
      })}
    </div>
  );
}