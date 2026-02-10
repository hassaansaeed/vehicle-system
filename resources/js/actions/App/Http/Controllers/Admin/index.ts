import VerificationController from './VerificationController'
import UserController from './UserController'
import HomepageController from './HomepageController'
import AuditLogController from './AuditLogController'

const Admin = {
    VerificationController: Object.assign(VerificationController, VerificationController),
    UserController: Object.assign(UserController, UserController),
    HomepageController: Object.assign(HomepageController, HomepageController),
    AuditLogController: Object.assign(AuditLogController, AuditLogController),
}

export default Admin