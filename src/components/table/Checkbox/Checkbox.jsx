import { useEffect, useRef } from "react";

export default function Checkbox({
  checked,
  indeterminate,
  onChange,
  disabled,
}) {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <input
      type="checkbox"
      ref={ref}
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      style={{ cursor: "pointer" }}
    />
  );
}
