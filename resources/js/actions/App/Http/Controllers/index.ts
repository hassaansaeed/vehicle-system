import VerificationSubmissionController from './VerificationSubmissionController'
import DashboardController from './DashboardController'
import Admin from './Admin'
import Settings from './Settings'

const Controllers = {
    VerificationSubmissionController: Object.assign(VerificationSubmissionController, VerificationSubmissionController),
    DashboardController: Object.assign(DashboardController, DashboardController),
    Admin: Object.assign(Admin, Admin),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers