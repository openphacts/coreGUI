class FeedbackMailer < ActionMailer::Base
  default :from => AppSettings.config["mail"]["user"]
  default :bcc => AppSettings.config["mail"]["to"]
  #, "bugs@openphacts.org"
  default :subject => "[coregui-feedback] New CoreGUI user feedback"
  default :reply_to => AppSettings.config["mail"]["reply_to"]
  # @param [String] feedbackText
  # @param [String] userEmail
  # @param [String] technicalInfo
  def feedback_email(feedbackText, userEmail, technicalInfo, versionNumber)
    @feedbackData = {:text => feedbackText, :email => userEmail, :techInfo => technicalInfo, :versionNumber => versionNumber}
    mail(:to => userEmail)
  end
end
