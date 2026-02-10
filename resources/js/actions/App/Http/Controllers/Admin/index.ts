import VerificationController from './VerificationController'
import UserController from './UserController'
import AuditLogController from './AuditLogController'

const Admin = {
    VerificationController: Object.assign(VerificationController, VerificationController),
    UserController: Object.assign(UserController, UserController),
    AuditLogController: Object.assign(AuditLogController, AuditLogController),
}

export default Admin