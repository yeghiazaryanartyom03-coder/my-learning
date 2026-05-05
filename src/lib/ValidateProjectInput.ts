const PROJECT_STATUSES = ["PLANNING", "IN_PROGRESS", "COMPLETED"] as const;

type ProjectStatus = (typeof PROJECT_STATUSES)[number]

interface ValidProjectInput {
    title: string;
    description: string | null;
    status: ProjectStatus;
    progress: number;
    dueDate: Date | null;
}

export function validationProjectInput(body: unknown):
    | { data: ValidProjectInput; error?: never }
    | { data?: never; error: string } {

    if (!body || typeof body !== "object") {
        return { error: "invalid request body" }
    }

    const data = body as Record<string, unknown>

    const title = typeof data.title === "string" ? data.title.trim() : "";

    if (title.length < 2) {
        return { error: "Title must be at least 2 characters" };
    }

    const description =
        typeof data.description === "string" && data.description.trim().length > 0
            ? data.description.trim()
            : null;

    const status = data.status;

    if (
        typeof status !== "string" ||
        !PROJECT_STATUSES.includes(status as ProjectStatus)
    ) {
        return { error: "Invalid project status" };
    }

    const validStatus = status as ProjectStatus

    const progress =
        typeof data.progress === "number"
            ? data.progress
            : typeof data.progress === "string"
                ? Number(data.progress)
                : NaN;

    if (!Number.isInteger(progress) || progress < 0 || progress > 100) {
        return { error: "Progress must be a number between 0 and 100" };
    }

    let dueDate: Date | null = null;

    if (data.dueDate !== null && data.dueDate !== undefined && data.dueDate !== "") {
        if (typeof data.dueDate !== "string") {
            return { error: "Invalid due date" };
        }

        dueDate = new Date(data.dueDate);

        if (Number.isNaN(dueDate.getTime())) {
            return { error: "Invalid due date" };
        }
    }

    return {
        data: {
            title,
            description,
            status: validStatus,
            progress,
            dueDate,
        },
    }
}