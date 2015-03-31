class MatchupsController < ApplicationController
  before_action :set_matchup, only: [:show, :edit, :update, :destroy]
  before_action :set_gon, except: [:edit]
  before_filter :authenticate_user!
  # GET /matchups
  # GET /matchups.json
  def index
    @matchups = Matchup.all
  end

  # GET /matchups/1
  # GET /matchups/1.json
  def show
  end

  # GET /matchups/new
  def new
    @matchup = Matchup.new
    #Variable welche von der view gebraucht wird

  end

  def selectmatchup
    @champions = Champion.all

  end
  
  # GET /matchups/1/edit
  def edit
    @matchup = Matchup.find(params[:id])
    @masteries = @matchup.mastHash
    @spellImages = @matchup.getSpellImg
    gon.skillorder = @matchup.skillOrderArray
    gon.summoners = @matchup.sumArray
    gon.startArray = @matchup.startBuildArray
    gon.finalArray = @matchup.finalBuildArray
    gon.earlyCore = @matchup.earlyCoreArray
    gon.midCore = @matchup.midCoreArray
    gon.lateCore = @matchup.lateCoreArray


  end

  # POST /matchups
  # POST /matchups.json
  def create
    @matchup = Matchup.new(matchup_params)
    @matchup.user_id = current_user.id
    @matchup.champ_eins_id = Champion.find_by name: @matchup.champ_eins
    @matchup.champ_zwei_id = Champion.find_by name: @matchup.champ_zwei
    respond_to do |format|
      if @matchup.save
        format.html { redirect_to @matchup, notice: 'Matchup was successfully created.' }
        format.json { render :show, status: :created, location: @matchup }
      else
        @masteries = @matchup.mastHash
        @spellImages = @matchup.getSpellImg
        gon.skillorder = @matchup.skillOrderArray
        gon.summoners = @matchup.sumArray
        gon.startArray = @matchup.startBuildArray
        gon.finalArray = @matchup.finalBuildArray
        gon.earlyCore = @matchup.earlyCoreArray
        gon.midCore = @matchup.midCoreArray
        gon.lateCore = @matchup.lateCoreArray
        format.html {render :new}
        format.json { render json: @matchup.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /matchups/1
  # PATCH/PUT /matchups/1.json
  def update
    respond_to do |format|
      if @matchup.update(matchup_params)
        format.html { redirect_to @matchup, notice: 'Matchup was successfully updated.' }
        format.json { render :show, status: :ok, location: @matchup }
      else
        @masteries = @matchup.mastHash
        @spellImages = @matchup.getSpellImg
        gon.skillorder = @matchup.skillOrderArray
        gon.summoners = @matchup.sumArray
        gon.startArray = @matchup.startBuildArray
        gon.finalArray = @matchup.finalBuildArray
        gon.earlyCore = @matchup.earlyCoreArray
        gon.midCore = @matchup.midCoreArray
        gon.lateCore = @matchup.lateCoreArray
        format.html { render :edit }
        format.json { render json: @matchup.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /matchups/1
  # DELETE /matchups/1.json
  def destroy
    @matchup.destroy
    respond_to do |format|
      format.html { redirect_to matchups_url, notice: 'Matchup was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
  # Methode welche dem js file die gon vairable gibt 
    def set_gon
      gon.champs = $allchamps
      gon.url = $apiurl
      gon.skillorder = ""
      gon.summoners = ""
      gon.startArray = ""
      gon.finalArray = "" 
      gon.earlyCore = ""  
      gon.midCore = "" 
      gon.lateCore = ""
    end
    # Use callbacks to share common setup or constraints between actions.
    def set_matchup
      @matchup = Matchup.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def matchup_params
      params.require(:matchup).permit(:final_build, :runes, :champ_eins, :champ_zwei, :masteries, :skill_order, :start_items, :early_laning, :mid_laning, :late_laning, :general_role, :early_core_items, :mid_core_items,:late_core_items, :summoners, :early_item_1, :early_item_2, :early_item_3, :early_item_4, :early_item_5, :early_item_6,:mid_item_1, :mid_item_2, :mid_item_3, :mid_item_4, :mid_item_5, :mid_item_6,:late_item_1, :late_item_2, :late_item_3, :late_item_4, :late_item_5, :late_item_6, :spell_q, :spell_w, :spell_e, :spell_r)

    end


end
