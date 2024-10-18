'use client';

export default async function DeleteButton({ id }: { id: string }) {
  const handleDelete = async () => {
    const confirm = window.confirm(
      'Are you sure you want to delete this post?'
    );

    if (confirm) {
      try {
        const res = await fetch(`/api/posts/${id}`, {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
          },
        });

        if (res.ok) {
          console.log('post deleted');
        }
      } catch (error) {
        console.log(error);
        return null;
      }
    }
  };
  return (
    <div>
      <button onClick={handleDelete} className="text-red-700">
        Delete
      </button>
    </div>
  );
}
