class Admin::SignatureSheetsController < Admin::BaseController
  before_action :set_signature_sheet, only: [:show, :destroy]

  def index
    @signature_sheets = SignatureSheet.all.order(created_at: :desc)
  end

  def new
    @signature_sheet = SignatureSheet.new
  end

  def create
    @signature_sheet = SignatureSheet.new(signature_sheet_params)
    @signature_sheet.author = current_user
    if @signature_sheet.save
      @signature_sheet.delay.verify_signatures
      redirect_to [:admin, @signature_sheet], notice: I18n.t("flash.actions.create.signature_sheet")
    else
      render :new
    end
  end

  def show
    @voted_signatures = Vote.where(signature: @signature_sheet.signatures.verified).count
  end

  def destroy
    @signature_sheet.destroy
    redirect_to admin_signature_sheets_path
  end

  private

    def signature_sheet_params
      params.require(:signature_sheet).permit(
        :signable_type,
        :signable_id,
        :title,
        :required_fields_to_verify
      )
    end

    def set_signature_sheet
      @signature_sheet = SignatureSheet.find(params[:id])
    end
end
