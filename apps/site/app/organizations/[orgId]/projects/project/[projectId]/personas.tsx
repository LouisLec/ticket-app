"use client";
import { useReducer, useState } from "react";

interface Project {
  id: string;
  name: string;
  description: string;
}

interface Props {
  projects: Project[];
  onCreate: (project: Project) => void;
  onUpdate: (project: Project) => void;
  onDelete: (id: string) => void;
}

interface State {
  projects: Project[];
  selectedProjectId: string | null;
  isCreateDialogOpen: boolean;
}

const initialState: State = {
  projects: [],
  selectedProjectId: null,
  isCreateDialogOpen: false,
};

function reducer(state: State, action: { type: string; payload?: any }) {
  switch (action.type) {
    case "SET_PROJECTS":
      return { ...state, projects: action.payload };
    case "OPEN_CREATE_DIALOG":
      return { ...state, isCreateDialogOpen: true };
    case "CLOSE_CREATE_DIALOG":
      return { ...state, isCreateDialogOpen: false };
    case "OPEN_UPDATE_DIALOG":
      return { ...state, selectedProjectId: action.payload };
    case "CLOSE_UPDATE_DIALOG":
      return { ...state, selectedProjectId: null };
    default:
      return state;
  }
}

export default function Projects({
  projects,
  onCreate,
  onUpdate,
  onDelete,
}: Props) {
  const [state, dispatch] = useReducer(reducer, { projects });

  function handleCreate(project: Project) {
    onCreate(project);
    dispatch({ type: "CLOSE_CREATE_DIALOG" });
  }

  function handleUpdate(project: Project) {
    onUpdate(project);
    dispatch({ type: "CLOSE_UPDATE_DIALOG" });
  }

  function handleDelete(id: string) {
    onDelete(id);
  }

  return (
    <div>
      <button onClick={() => dispatch({ type: "OPEN_CREATE_DIALOG" })}>
        Create Project
      </button>
      {state.projects.map(project => (
        <div key={project.id}>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <button
            onClick={() =>
              dispatch({ type: "OPEN_UPDATE_DIALOG", payload: project.id })
            }
          >
            Edit
          </button>
          <button onClick={() => handleDelete(project.id)}>Delete</button>
        </div>
      ))}
      {state.selectedProjectId && (
        <UpdateProjectDialog
          project={state.projects.find(
            project => project.id === state.selectedProjectId
          )}
          onSave={handleUpdate}
          onCancel={() => dispatch({ type: "CLOSE_UPDATE_DIALOG" })}
        />
      )}
      {state.isCreateDialogOpen && (
        <CreateProjectDialog
          onSave={handleCreate}
          onCancel={() => dispatch({ type: "CLOSE_CREATE_DIALOG" })}
        />
      )}
    </div>
  );
}
