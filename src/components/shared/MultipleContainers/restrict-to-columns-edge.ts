import type {Modifier} from '@dnd-kit/core';
import type {ViewRect} from '@dnd-kit/core';
import type {Transform} from '@dnd-kit/utilities';

export function restrictToBoundingRect(
  transform: Transform,
  rect: ViewRect,
  boundingRect: ViewRect
): Transform {
  const value = {
    ...transform,
  };

  if (rect.top + transform.y <= boundingRect.top) {
    value.y = boundingRect.top - rect.top;
  } else if (rect.bottom + transform.y >= boundingRect.bottom) {
    value.y = boundingRect.bottom - rect.bottom;
  }

  if (rect.left + transform.x <= boundingRect.left) {
    value.x = boundingRect.left - rect.left;
  } else if (rect.right + transform.x >= boundingRect.left + boundingRect.width) {
    value.x = boundingRect.left + boundingRect.width - rect.right;
  }

  return value;
}


export const restrictToColumnsEdge: Modifier = ({
  transform,
  activeNodeRect,
}) => {
  if (!activeNodeRect) {
    return transform;
  }
  const element = window.document.getElementById('js-columns').getBoundingClientRect()

  const columns = {top: element.top, bottom: element.bottom, left: element.left, right: element.right}

  return restrictToBoundingRect(transform, activeNodeRect, columns as ViewRect);
};