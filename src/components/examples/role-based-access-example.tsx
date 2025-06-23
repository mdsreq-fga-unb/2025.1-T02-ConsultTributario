'use client';

import { RoleBasedGuard, useRolePermission } from '@/auth';

// ----------------------------------------------------------------------

// Exemplo de componente que só admins podem ver
const AdminOnlyComponent = () => (
  <RoleBasedGuard roles={['admin']} hasContent>
    <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
      <h3 className='text-red-800 font-medium'>Área Restrita - Apenas Admins</h3>
      <p className='text-red-700 text-sm mt-1'>Este conteúdo só é visível para administradores.</p>
    </div>
  </RoleBasedGuard>
);

// Exemplo de componente que admins e moderadores podem ver
const ModeratorComponent = () => (
  <RoleBasedGuard roles={['admin']} hasContent>
    <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4'>
      <h3 className='text-yellow-800 font-medium'>Área de Moderação</h3>
      <p className='text-yellow-700 text-sm mt-1'>
        Este conteúdo é visível para admins e moderadores.
      </p>
    </div>
  </RoleBasedGuard>
);

// Exemplo de uso com hooks de permissão
const ConditionalContent = () => {
  const { isAdmin, hasAnyRole, currentRole } = useRolePermission();

  return (
    <div className='space-y-4'>
      <div className='bg-gray-50 border border-gray-200 rounded-lg p-4'>
        <h3 className='text-gray-800 font-medium'>Informações do Usuário</h3>
        <p className='text-gray-600 text-sm mt-1'>Role atual: {currentRole}</p>
      </div>

      {isAdmin() && (
        <div className='bg-green-50 border border-green-200 rounded-lg p-4'>
          <h3 className='text-green-800 font-medium'>Funcionalidades de Admin</h3>
          <p className='text-green-700 text-sm mt-1'>Você tem acesso total ao sistema.</p>
        </div>
      )}

      {hasAnyRole(['admin']) && (
        <div className='bg-purple-50 border border-purple-200 rounded-lg p-4'>
          <h3 className='text-purple-800 font-medium'>Área Especial</h3>
          <p className='text-purple-700 text-sm mt-1'>Conteúdo para roles especiais.</p>
        </div>
      )}
    </div>
  );
};

// Página principal demonstrando o uso
const RoleBasedAccessExample = () => {
  return (
    <div className='max-w-4xl mx-auto p-6 space-y-6'>
      <div>
        <h1 className='text-2xl font-bold text-gray-900 mb-2'>
          Sistema de Controle de Acesso por Roles
        </h1>
        <p className='text-gray-600'>
          Exemplos de como implementar controle de acesso baseado em roles.
        </p>
      </div>

      <ConditionalContent />
      <AdminOnlyComponent />
      <ModeratorComponent />

      <div className='bg-white border border-gray-200 rounded-lg p-6'>
        <h2 className='text-lg font-semibold text-gray-900 mb-4'>Como usar o sistema de roles:</h2>
        <div className='space-y-4 text-sm text-gray-600'>
          <div>
            <h3 className='font-medium text-gray-900'>1. Usando RoleBasedGuard:</h3>
            <pre className='bg-gray-100 p-2 rounded mt-1 text-xs overflow-x-auto'>
              {`<RoleBasedGuard roles={['admin']} hasContent>
  <div>Conteúdo só para admins</div>
</RoleBasedGuard>`}
            </pre>
          </div>
          <div>
            <h3 className='font-medium text-gray-900'>2. Usando hooks de permissão:</h3>
            <pre className='bg-gray-100 p-2 rounded mt-1 text-xs overflow-x-auto'>
              {`const { isAdmin, canModerate } = useRolePermission();

{isAdmin() && <AdminContent />}
{canModerate() && <ModeratorContent />}`}
            </pre>
          </div>
          <div>
            <h3 className='font-medium text-gray-900'>3. Roles disponíveis:</h3>
            <ul className='list-disc list-inside mt-1 space-y-1'>
              <li>
                <code className='bg-gray-100 px-1 rounded'>admin</code> - Acesso total
              </li>
              <li>
                <code className='bg-gray-100 px-1 rounded'>moderator</code> - Pode moderar conteúdo
              </li>
              <li>
                <code className='bg-gray-100 px-1 rounded'>user</code> - Usuário comum
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleBasedAccessExample;
