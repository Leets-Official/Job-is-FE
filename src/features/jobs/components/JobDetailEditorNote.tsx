interface JobDetailEditorNoteProps {
  note: string;
}

export default function JobDetailEditorNote({ note }: JobDetailEditorNoteProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <p className="text-heading-xxsmall font-bold text-text-primary">Editor&apos;s Note</p>
      <div className="w-full rounded-sm bg-gray-50 p-4">
        <p className="whitespace-pre-line text-body-small font-medium text-text-secondary">
          {note}
        </p>
      </div>
    </div>
  );
}
