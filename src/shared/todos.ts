enum TodosType {
  Check,
  List,
  Completed,
}

interface ITodos {
  getType(): TodosType;
  createAt(): Date;
  content(): String;
}

abstract class SimpleTodo implements ITodos {
  private m_content: String;
  private m_createdAt: Date;
  protected m_prefix: String;

  constructor(content: String, createAt: Date, prefix: String) {
    this.m_content = content;
    this.m_createdAt = createAt;
    this.m_prefix = "";
  }

  abstract getType(): TodosType;

  createAt = () => this.m_createdAt;

  content = () => `${this.m_prefix} ${this.m_content}`;

  protected updatePrefix = (npref: String) => (this.m_prefix = npref);
}

class ListedTodo extends SimpleTodo {
  constructor(content: String, createAt: Date) {
    super(content, createAt, "-");
  }

  getType: () => TodosType = () => TodosType.List;
}

export { TodosType, ListedTodo };
