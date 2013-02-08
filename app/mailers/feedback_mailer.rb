class FeedbackMailer < ActionMailer::Base
  default :bcc => AppSettings.config["mail"]["to"],
          :subject => "[coregui-feedback] New CoreGUI user feedback"
  # @param [String] feedbackText
  # @param [String] userEmail
  # @param [String] technicalInfo
  def feedback_email(feedbackText, userEmail, technicalInfo, versionNumber)
    @feedbackData = {:text => feedbackText, :email => userEmail, :techInfo => technicalInfo, :versionNumber => versionNumber}
    mail(:to => "bugs@openphacts.org", :reply_to => userEmail, :from => userEmail)
  end
end
