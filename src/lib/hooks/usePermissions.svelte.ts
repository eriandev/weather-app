export function usePermissions() {
  const query = async (descriptor: PermissionDescriptor) => {
    return await navigator.permissions.query(descriptor)
  }

  return { query }
}
