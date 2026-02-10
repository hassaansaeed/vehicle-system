import VerificationSubmissionController from './VerificationSubmissionController'
import Admin from './Admin'
import Settings from './Settings'

const Controllers = {
    VerificationSubmissionController: Object.assign(VerificationSubmissionController, VerificationSubmissionController),
    Admin: Object.assign(Admin, Admin),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers