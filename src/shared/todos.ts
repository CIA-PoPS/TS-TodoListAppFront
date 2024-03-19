namespace TodoTypes {
  export enum TodosType {
    Check,
    List,
    Completed,
  }

  export interface ITodos {
    getType(): TodosType;
    createAt(): Date;
    content(): String;
  }
}

abstract class SimpleTodo implements TodoTypes.ITodos {
  private m_content: String;
  private m_createdAt: Date;
  protected m_prefix: String;

  constructor(content: String, createAt: Date, prefix: String) {
    this.m_content = content;
    this.m_createdAt = createAt;
    this.m_prefix = "";
  }

  abstract getType(): TodoTypes.TodosType;

  createAt = () => this.m_createdAt;

  content = () => `${this.m_prefix} ${this.m_content}`;

  protected updatePrefix = (npref: String) => (this.m_prefix = npref);
}

class ListedTodo extends SimpleTodo {
  constructor(content: String, createAt: Date) {
    super(content, createAt, "-");
  }

  getType: () => TodoTypes.TodosType = () => TodoTypes.TodosType.List;
}

export { TodoTypes, ListedTodo, SimpleTodo };
