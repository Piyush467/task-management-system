interface Props {
  title: string;
  subtitle?: string;
}

const EmptyState = ({
  title,
  subtitle,
}: Props) => {
  return (
    <div className="rounded-xl bg-white p-12 text-center shadow">

      <h2 className="text-2xl font-bold">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-3 text-gray-500">
          {subtitle}
        </p>
      )}

    </div>
  );
};

export default EmptyState;