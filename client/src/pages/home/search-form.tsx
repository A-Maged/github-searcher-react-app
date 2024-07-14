export function SearchForm() {
  return (
    <div className="flex gap-5">
      <input name="q" type="text" placeholder="Start typing to search .." />

      <select name="type">
        <option value="users">Users</option>
        <option value="repos">Repos</option>
      </select>
    </div>
  );
}
