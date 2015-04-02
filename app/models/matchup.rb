class Matchup < ActiveRecord::Base
	acts_as_commontable
	# champ validation
	validates :champ_eins, presence: {:message => "Champion left can't be empty." }
	validates :champ_zwei, presence: {:message => "Champion right can't be empty." }
	validate :champ_cant_be_equal
	# rune validation
	validate :runes_has_to_be_full
	# masteries validation
	validate :masteries_has_to_be_full
	# champ abilites validation
	validates :spell_q, presence: {:message => "There has to be a description on how to use the Q spell."}
	validates :spell_w, presence: {:message => "There has to be a description on how to use the W spell."}
	validates :spell_e, presence: {:message => "There has to be a description on how to use the E spell."}
	validates :spell_r, presence: {:message => "There has to be a description on how to use the R spell."}
	# Skill order validation
	validate :skillorder_has_to_be_full
	# Summoner validation
	validate :summoner_has_to_be_two
	# Start Build validation
	validate :start_has_to_be_three
	# Early Lane validation
	validates :early_laning, presence: {:message => "There has to be a description for the early laning phase."}
	validate :earlyCore_min_one
	validate :items_early_need_description
	# Mid Lane validation
	validates :mid_laning, presence: {:message => "There has to be a description for the mid laning phase."}
	validate :midCore_min_one
	validate :items_mid_need_description
	# Late Lane validation
	validates :late_laning, presence: {:message => "There has to be a description for the late laning phase."}
	validate :lateCore_min_one
	validate :items_late_need_description
	# General Role validation
	validates :general_role, presence: {:message => "General role can't be empty."}
	# Final Build validation
	validate :final_build_has_to_be_full


	# Checkt ob beide champions die gleichen sind
	def champ_cant_be_equal
  		@errors.add(:base, "The same champion can't be on both sides.") if self.champ_eins == self.champ_zwei
	end

	def runes_has_to_be_full
		count = 0
		runeString = self[:runes]
		runeArray = runeString.split("|")
		runeArray.each do |rune|
			type = rune.split("x")
			count += type[0].to_i
		end

		@errors.add(:base, "There have to be 30 runes.") if count < 30
	end

	def masteries_has_to_be_full
		count = 0
		masString = self[:masteries]
		masArray = masString.split("|")
		masArray.each do |mas|
			type = mas.split(",")
			type.each do |masName|
				name = masName.split("x")
				count += name[0].to_i
			end
			
		end

		@errors.add(:base, "There have to be 30 masteries.") if count < 30
	end

	def skillorder_has_to_be_full
		arrSkills = self[:skill_order].split(",")
		@errors.add(:base, "There have to be 18 points in skill order.") if arrSkills.length <18
	end

	def summoner_has_to_be_two
		arrSummoners = self[:summoners].split("|")
		@errors.add(:base, "There have to be 2 selected summoners.") if arrSummoners.length < 2
	end

	def start_has_to_be_three
		arrStart = self[:start_items].split("|")
		@errors.add(:base, "There have to be atleast 3 start items. (inclusive Trinket)") if arrStart.length < 3
	end

	def earlyCore_min_one
		arrEarlyCore = self[:early_core_items].split("|")
		@errors.add(:base, "There has to be atleast one core item in the early laning phase.") if arrEarlyCore.length < 1
	end

	def items_early_need_description
		itemNr = 1
		countItems = self[:early_core_items].split("|")
		countItems.each do |item|
			itemName = "early_item_" + itemNr.to_s
			@errors.add(:base, "There has to be a description to all selected items in the early laning phase.") if self[itemName.to_sym].blank? 
			itemNr +=1;
		end
	end

	def midCore_min_one
		arrMidCore = self[:mid_core_items].split("|")
		@errors.add(:base, "There have to be atleast one core item in the mid laning phase.") if arrMidCore.length < 1
	end

	def items_mid_need_description
		itemNr = 1
		countItems = self[:mid_core_items].split("|")
		countItems.each do |item|
			itemName = "mid_item_" + itemNr.to_s
			@errors.add(:base, "There have to be a description to all selected items in the mid laning phase.") if self[itemName.to_sym].blank? 
			itemNr +=1;
		end
	end

	def lateCore_min_one
		arrLateCore = self[:late_core_items].split("|")
		@errors.add(:base, "There have to be atleast one core item in the late laning phase.") if arrLateCore.length < 1
	end

	def items_late_need_description
		itemNr = 1
		countItems = self[:late_core_items].split("|")
		countItems.each do |item|
			itemName = "late_item_" + itemNr.to_s
			@errors.add(:base, "There have to be a description to all selected items in the late laning phase.") if self[itemName.to_sym].blank? 
			itemNr +=1;
		end
	end

	def final_build_has_to_be_full
		arrFinal = self[:final_build].split("|")
		@errors.add(:base, "There have to be 7 selected Items for the final build (inklusive trinket).") if arrFinal.length < 7
	end
	#########################################################################################
	# Funktionen für edit und wenn validation nicht klappt
	#########################################################################################

	# Methode welche aus den Masteries ein Hash macht name => anzahl
	def mastHash
			mast = self[:masteries]
			puts mast
			masteries = Hash.new 
			arrMas = Array.new 
			arrSingleMas = Array.new
			arrNrName = Array.new
			count = 0
			arrMas = mast.split("|") 
			for arrTree in arrMas do
				  arrSingleMas = arrTree.split(",")
				  arrSingleMas.each do |armas|
				  arrNrName = armas.split("x")
				  masteries[arrNrName[1]] = arrNrName[0]
				  puts masteries
				end
			end 
		return masteries
	end

	def getSpellImg
		masteryImages = Array.new
		spellImages = Array.new
		oneSpell = Array.new
    	$allchamps.each do |champ| 
            if champ.name == self[:champ_eins]
                champspells = champ.spells

                champspells.each do |spell|
                	oneSpell.push(spell)
                end
                oneSpell.each do |one|
                	one.each do |key, value|
                		if key == "image"
                			spellImages.push(value)
                		end
                	end
                end
                spellImages.each do |spell|
                	spell.each do |key, value|           	
	                	if key == "full"
	                		masteryImages.push(value)
	                	end	                	
                	end
                end
            end 
        end
        return masteryImages 
	end

	def skillOrderArray
		skillL = Array.new
		skillOrder = self[:skill_order]
		arrSkill = skillOrder.split(",")
		puts arrSkill
		arrSkill.each do |skill|
			skillL.push(skill.gsub(/[^a-zA-Z ]/,'').gsub(/ +/,' '))
			puts skill
		end
		puts skillL
		return skillL
	end

	def sumArray
		sArr = Array.new
		puts self[:summoners]
		sArr = self[:summoners].split("|")
		return sArr
	end

	def startBuildArray
		startArr = Array.new
		startArr = self[:start_items].split("|")
		return startArr
	end

	def finalBuildArray
		finalArr = Array.new
		finalArr = self[:final_build].split("|")
		return finalArr
	end

	def earlyCoreArray
		earlyArray = Array.new
		earlyArray = self[:early_core_items].split("|")
		return earlyArray
	end

	def midCoreArray
		midArray = Array.new
		midArray = self[:mid_core_items].split("|")
		return midArray
	end

	def lateCoreArray
		lateArray = Array.new
		lateArray = self[:late_core_items].split("|")
		return lateArray
	end

	# Methode welche für Show gebruacht wird

end
