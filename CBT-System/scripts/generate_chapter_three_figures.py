from pathlib import Path

import matplotlib.pyplot as plt
from matplotlib.patches import FancyArrowPatch, Rectangle


TOPIC_DIR = Path(__file__).resolve().parents[1]
FIGURES_DIR = TOPIC_DIR / "drafts" / "figures"


def setup_figure(width=12, height=7):
    fig, ax = plt.subplots(figsize=(width, height))
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.axis("off")
    return fig, ax


def add_box(ax, x, y, w, h, text, *, fontsize=11, facecolor="#f4f4f4", edgecolor="#222222", lw=1.5):
    rect = Rectangle((x, y), w, h, facecolor=facecolor, edgecolor=edgecolor, linewidth=lw)
    ax.add_patch(rect)
    ax.text(x + w / 2, y + h / 2, text, ha="center", va="center", fontsize=fontsize, wrap=True)


def add_arrow(ax, start, end, *, text=None, fontsize=10):
    arrow = FancyArrowPatch(start, end, arrowstyle="->", mutation_scale=16, linewidth=1.5, color="#222222")
    ax.add_patch(arrow)
    if text:
        mx = (start[0] + end[0]) / 2
        my = (start[1] + end[1]) / 2
        ax.text(mx, my + 0.03, text, ha="center", va="center", fontsize=fontsize)


def save(fig, name):
    FIGURES_DIR.mkdir(parents=True, exist_ok=True)
    path = FIGURES_DIR / name
    fig.savefig(path, dpi=220, bbox_inches="tight")
    plt.close(fig)
    print(f"Created {path}")


def draw_architecture():
    fig, ax = setup_figure()
    add_box(ax, 0.05, 0.62, 0.18, 0.14, "Student", facecolor="#e8f1ff")
    add_box(ax, 0.05, 0.28, 0.18, 0.14, "Administrator", facecolor="#fff2e0")
    add_box(ax, 0.33, 0.48, 0.22, 0.22, "Presentation Layer\n\nMobile and Web Interfaces\nExam Pages\nAdmin Dashboard", facecolor="#eef7ee")
    add_box(ax, 0.65, 0.48, 0.22, 0.22, "Application Layer\n\nAuthentication\nExam Logic\nSession Control\nAnti-Cheat Logic", facecolor="#fdf3e6")
    add_box(ax, 0.65, 0.14, 0.22, 0.18, "Data Layer\n\nStudents\nExams\nQuestions\nSessions\nAnswers\nViolations", facecolor="#f6eefb")
    add_arrow(ax, (0.23, 0.69), (0.33, 0.63))
    add_arrow(ax, (0.23, 0.35), (0.33, 0.55))
    add_arrow(ax, (0.55, 0.59), (0.65, 0.59))
    add_arrow(ax, (0.76, 0.48), (0.76, 0.32))
    add_arrow(ax, (0.65, 0.26), (0.55, 0.26), text="Stored data")
    add_arrow(ax, (0.65, 0.55), (0.55, 0.55), text="Processed response")
    ax.text(0.5, 0.92, "SYSTEM ARCHITECTURE OF THE PROPOSED CBT PLATFORM", ha="center", va="center", fontsize=14, fontweight="bold")
    save(fig, "figure_3_1_system_architecture.png")


def draw_use_case():
    fig, ax = setup_figure(12, 8)
    ax.text(0.5, 0.95, "USE CASE DIAGRAM OF THE PROPOSED CBT PLATFORM", ha="center", va="center", fontsize=14, fontweight="bold")
    add_box(ax, 0.28, 0.10, 0.45, 0.76, "CBT PLATFORM", facecolor="#ffffff", edgecolor="#444444")

    ax.text(0.10, 0.70, "Student", fontsize=12, fontweight="bold", ha="center")
    ax.text(0.90, 0.70, "Administrator", fontsize=12, fontweight="bold", ha="center")
    ax.plot([0.10, 0.10], [0.62, 0.80], color="#222222", linewidth=2)
    ax.plot([0.90, 0.90], [0.62, 0.80], color="#222222", linewidth=2)
    ax.add_patch(plt.Circle((0.10, 0.84), 0.025, fill=False, linewidth=2))
    ax.add_patch(plt.Circle((0.90, 0.84), 0.025, fill=False, linewidth=2))

    use_cases = [
        (0.50, 0.77, "Login"),
        (0.50, 0.68, "Start Exam"),
        (0.50, 0.60, "Answer Questions"),
        (0.50, 0.52, "Submit Exam"),
        (0.50, 0.44, "Receive Warnings"),
        (0.50, 0.35, "Create Exam"),
        (0.50, 0.27, "Manage Questions"),
        (0.50, 0.19, "Manage Students"),
        (0.50, 0.11, "Monitor Sessions\nand Results"),
    ]

    for x, y, label in use_cases:
        ellipse = plt.Circle((x, y), 0.055, fill=False, linewidth=1.5)
        ax.add_patch(ellipse)
        ax.text(x, y, label, ha="center", va="center", fontsize=9, wrap=True)

    for y in [0.77, 0.68, 0.60, 0.52, 0.44]:
        ax.plot([0.10, 0.445], [0.74, y], color="#222222", linewidth=1)
    for y in [0.77, 0.35, 0.27, 0.19, 0.11]:
        ax.plot([0.90, 0.555], [0.74, y], color="#222222", linewidth=1)
    save(fig, "figure_3_2_use_case_diagram.png")


def draw_flowchart():
    fig, ax = setup_figure(10, 12)
    ax.text(0.5, 0.97, "SYSTEM FLOWCHART FOR STUDENT EXAM PROCESS", ha="center", va="center", fontsize=14, fontweight="bold")
    items = [
        (0.32, 0.88, 0.36, 0.07, "Start"),
        (0.22, 0.77, 0.56, 0.07, "Student logs in"),
        (0.17, 0.65, 0.66, 0.08, "System checks exam availability\nand student eligibility"),
        (0.22, 0.53, 0.56, 0.07, "Load questions and start timer"),
        (0.20, 0.41, 0.60, 0.08, "Student answers questions\nand system monitors violations"),
        (0.18, 0.28, 0.64, 0.08, "Warning limit reached?"),
        (0.07, 0.15, 0.32, 0.08, "Auto submit /\nTerminate session"),
        (0.61, 0.15, 0.32, 0.08, "Manual submit or\nTime runs out"),
        (0.28, 0.03, 0.44, 0.08, "Score, store result,\nand end session"),
    ]
    for x, y, w, h, text in items:
        add_box(ax, x, y, w, h, text, fontsize=10)

    add_arrow(ax, (0.50, 0.88), (0.50, 0.84))
    add_arrow(ax, (0.50, 0.77), (0.50, 0.73))
    add_arrow(ax, (0.50, 0.65), (0.50, 0.60))
    add_arrow(ax, (0.50, 0.53), (0.50, 0.49))
    add_arrow(ax, (0.50, 0.41), (0.50, 0.36))
    add_arrow(ax, (0.37, 0.28), (0.23, 0.23), text="Yes")
    add_arrow(ax, (0.63, 0.28), (0.77, 0.23), text="No")
    add_arrow(ax, (0.23, 0.15), (0.40, 0.11))
    add_arrow(ax, (0.77, 0.15), (0.60, 0.11))
    save(fig, "figure_3_3_system_flowchart.png")


def draw_erd():
    fig, ax = setup_figure(14, 9)
    ax.text(0.5, 0.95, "ENTITY RELATIONSHIP DIAGRAM OF THE PROPOSED CBT PLATFORM", ha="center", va="center", fontsize=14, fontweight="bold")

    add_box(ax, 0.05, 0.62, 0.20, 0.18, "STUDENTS\n\nstudent_id (PK)\nmatric_no\nsurname\nfirst_name", fontsize=10, facecolor="#e8f1ff")
    add_box(ax, 0.38, 0.70, 0.22, 0.18, "EXAMS\n\nexam_id (PK)\ntitle\ncourse_code\nduration", fontsize=10, facecolor="#eef7ee")
    add_box(ax, 0.72, 0.62, 0.22, 0.20, "QUESTIONS\n\nquestion_id (PK)\nexam_id (FK)\ntext\ncorrect_option", fontsize=10, facecolor="#fff2e0")
    add_box(ax, 0.36, 0.34, 0.26, 0.20, "SESSIONS\n\nsession_id (PK)\nstudent_id (FK)\nexam_id (FK)\nstatus\nwarning_count", fontsize=10, facecolor="#f6eefb")
    add_box(ax, 0.07, 0.18, 0.22, 0.18, "ANSWERS\n\nanswer_id (PK)\nsession_id (FK)\nquestion_id (FK)\nselected_option", fontsize=10, facecolor="#fdf3e6")
    add_box(ax, 0.71, 0.18, 0.22, 0.18, "VIOLATIONS\n\nviolation_id (PK)\nsession_id (FK)\ntype\ntimestamp", fontsize=10, facecolor="#ffeaea")

    add_arrow(ax, (0.25, 0.71), (0.36, 0.44), text="1..*")
    add_arrow(ax, (0.49, 0.70), (0.49, 0.54), text="1..*")
    add_arrow(ax, (0.60, 0.76), (0.72, 0.72), text="1..*")
    add_arrow(ax, (0.36, 0.40), (0.29, 0.28), text="1..*")
    add_arrow(ax, (0.62, 0.40), (0.71, 0.28), text="1..*")
    add_arrow(ax, (0.72, 0.62), (0.29, 0.27), text="Question used in")
    save(fig, "figure_3_4_erd.png")


def main():
    draw_architecture()
    draw_use_case()
    draw_flowchart()
    draw_erd()


if __name__ == "__main__":
    main()
