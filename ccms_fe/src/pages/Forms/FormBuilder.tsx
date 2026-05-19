import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import DefaultInputs from "../../components/form/form-elements/DefaultInputs";
import SelectInputs from "../../components/form/form-elements/SelectInputs";
import TextAreaInput from "../../components/form/form-elements/TextAreaInput";
import ToggleSwitch from "../../components/form/form-elements/ToggleSwitch";

type FieldConfig = {
  id: string;
  label: string;
  type: string;
  required: boolean;
  hidden: boolean;
  autoIncrement: boolean;
  hideFromParent: boolean;
  disableTeacherEdit: boolean;
};

export default function FormBuilder() {
  const [fields, setFields] = useState<FieldConfig[]>([]);
  const [newField, setNewField] = useState<FieldConfig>({
    id: "",
    label: "",
    type: "text",
    required: false,
    hidden: false,
    autoIncrement: false,
    hideFromParent: false,
    disableTeacherEdit: false,
  });

  const addField = () => {
    if (!newField.label.trim()) return;
    setFields((prev) => [
      ...prev,
      { ...newField, id: Date.now().toString() },
    ]);
    setNewField({
      id: "",
      label: "",
      type: "text",
      required: false,
      hidden: false,
      autoIncrement: false,
      hideFromParent: false,
      disableTeacherEdit: false,
    });
  };

  const getFieldColor = (type: string) => {
    switch (type) {
      case "text":
        return "bg-blue-50 border-blue-200";
      case "select":
        return "bg-green-50 border-green-200";
      case "textarea":
        return "bg-yellow-50 border-yellow-200";
      case "toggle":
        return "bg-pink-50 border-pink-200";
      default:
        return "bg-white border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <PageMeta
        title="Form Builder | ToffelTech"
        description="Build custom enquiry and registration forms"
      />
      <PageBreadcrumb pageTitle="Form Builder" />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Left: Field Configurator */}
        <div className="space-y-4 bg-gray-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold">Add New Field</h2>
          <input
            type="text"
            placeholder="Enter field name..."
            value={newField.label}
            onChange={(e) =>
              setNewField({ ...newField, label: e.target.value })
            }
            className="w-full border rounded px-3 py-2"
          />
          <select
            value={newField.type}
            onChange={(e) =>
              setNewField({ ...newField, type: e.target.value })
            }
            className="w-full border rounded px-3 py-2"
          >
            <option value="text">Text</option>
            <option value="select">Select</option>
            <option value="textarea">Textarea</option>
            <option value="toggle">Toggle</option>
          </select>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={newField.required}
                onChange={(e) =>
                  setNewField({ ...newField, required: e.target.checked })
                }
              />
              Required Field
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={newField.autoIncrement}
                onChange={(e) =>
                  setNewField({ ...newField, autoIncrement: e.target.checked })
                }
              />
              Auto Increment
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={newField.hidden}
                onChange={(e) =>
                  setNewField({ ...newField, hidden: e.target.checked })
                }
              />
              Hidden Field
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={newField.hideFromParent}
                onChange={(e) =>
                  setNewField({
                    ...newField,
                    hideFromParent: e.target.checked,
                  })
                }
              />
              Hide from Parent
            </label>
            <label className="flex items-center gap-2 col-span-2">
              <input
                type="checkbox"
                checked={newField.disableTeacherEdit}
                onChange={(e) =>
                  setNewField({
                    ...newField,
                    disableTeacherEdit: e.target.checked,
                  })
                }
              />
              Disable Teacher Edit
            </label>
          </div>

          <button
            onClick={addField}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Field
          </button>
        </div>

        {/* Right: Preview */}
        <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold">Form Preview</h2>
          {fields.length === 0 ? (
            <p className="text-gray-500 italic">
              No fields added yet. Start by adding a field on the left.
            </p>
          ) : (
            fields.map((field) => (
              <div
                key={field.id}
                className={`${getFieldColor(
                  field.type
                )} border rounded p-4 space-y-2 shadow-sm`}
              >
                <div className="font-medium">{field.label}</div>
                {field.type === "text" && <DefaultInputs />}
                {field.type === "select" && <SelectInputs />}
                {field.type === "textarea" && <TextAreaInput />}
                {field.type === "toggle" && <ToggleSwitch />}
                <div className="text-xs text-gray-600">
                  {field.required && "Required • "}
                  {field.autoIncrement && "Auto Increment • "}
                  {field.hidden && "Hidden • "}
                  {field.hideFromParent && "Hidden from Parent • "}
                  {field.disableTeacherEdit && "Teacher Edit Disabled"}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
