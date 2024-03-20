import { ReactElement } from "react";
import { getArrowLogo } from "./logos";

export namespace TodoTypes {
  export enum TodosType {
    Check,
    List,
    Completed,
  }

  export class TodoPrefix {
    private m_prefix: ReactElement;
    private m_type: TodosType;

    private constructor(type: TodosType, prefix: ReactElement) {
      this.m_prefix = prefix;
      this.m_type = type;
    }

    getType = () => this.m_type;
    getPrefix = () => this.m_prefix;

    static get(prefix: string): TodoPrefix {
      switch (prefix) {
        default:
          return this.List;
      }
    }

    static List = new TodoPrefix(TodosType.List, getArrowLogo("h-8 w-8"));
  }

  export interface ITodos {
    getType(): TodosType;
    createAt(): number;
    content(): string;
  }

  export type TodoDTO = {
    createAt: number;
    by: string;
    content: string;
    prefix: string;
  };
}

export class SimpleTodo implements TodoTypes.ITodos {
  private m_content: string;
  private m_createdAt: number;
  protected m_prefix: TodoTypes.TodoPrefix;

  constructor(content: string, createAt: number, prefix: TodoTypes.TodoPrefix) {
    this.m_content = content;
    this.m_createdAt = createAt;
    this.m_prefix = prefix;
  }

  static fromDTO(dto: TodoTypes.TodoDTO): SimpleTodo {
    return new SimpleTodo(
      dto.content,
      dto.createAt,
      TodoTypes.TodoPrefix.get(dto.prefix)
    );
  }

  getType = () => this.m_prefix.getType();

  createAt = () => this.m_createdAt;

  content = () => `${this.m_prefix} ${this.m_content}`;

  protected updatePrefix = (npref: string) =>
    (this.m_prefix = TodoTypes.TodoPrefix.get(npref));
}
