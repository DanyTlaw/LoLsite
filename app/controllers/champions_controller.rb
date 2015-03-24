class ChampionsController < ApplicationController
  before_action  only: [:show, :edit, :update, :destroy]

  # GET /champions
  # GET /champions.json
  def index


    @champions = Champion.all


  end

  # GET /champions/1
  # GET /champions/1.json
  def show 
    @champion = Champion.find(params[:id])
    @counter = @champion.counters.build

    name = @champion.name.downcase.to_sym

    @champ = $client.static_data.champion_by_id RiotGamesApi::LOL::CHAMPIONS[name]

    @passive = $apiurl + "passive" + "/" + @champ.passive.image.full

    @spells = Array.new

    @champ.spells.each do |spell|
     @spells.push(spell)
    end

    @spellsurl = Array.new

    @spells.each do |spell|
      @spellsurl.push($apiurl + "spell" + "/" + spell.image.full)
    end

    @spellscost = Array.new

    @spells.each do |spell|
     @spellscost.push(spell.cost)
    end

    @spellsCD = Array.new

    @spells.each do |spell|
      @spellsCD.push(spell.cooldown)
    end

    @spellsTooltip = Array.new

    @spells.each do |spell|
      @spellsTooltip.push(spell.sanitized_tooltip)
    end

    @spellsRange = Array.new

    @spells.each do |spell|
      @spellsRange.push(spell.range)
    end

    @spellsEffect = Array.new

    @spells.each do |spell|
      @spellsEffect.push(spell.effect_burn)
      puts spell.effect_burn
    end


    @spellsVars = Array.new

    @spells.each do |spell|
      @spellsVars.push(spell.vars)
      puts "------------------VARS----------------------"
      puts spell.vars
    end

  end

  # GET /champions/new
  def new
    @champion = Champion.new
  end

  # GET /champions/1/edit
  def edit
  end

  # POST /champions
  # POST /champions.json
  def create
    @champion = Champion.new(champion_params)

    respond_to do |format|
      if @champion.save
        format.html { redirect_to @champion, notice: 'Champion was successfully created.' }
        format.json { render :show, status: :created, location: @champion }
      else
        format.html { render :new }
        format.json { render json: @champion.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /champions/1
  # PATCH/PUT /champions/1.json
  def update
    respond_to do |format|
      if @champion.update(champion_params)
        format.html { redirect_to @champion, notice: 'Champion was successfully updated.' }
        format.json { render :show, status: :ok, location: @champion }
      else
        format.html { render :edit }
        format.json { render json: @champion.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /champions/1
  # DELETE /champions/1.json
  def destroy
    @champion.destroy
    respond_to do |format|
      format.html { redirect_to champions_url, notice: 'Champion was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def champion_params
      params.require(:champion).permit(:name, :lane, :quickinfo, :portrait)
    end
end
