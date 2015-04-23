class Champion < ActiveRecord::Base
has_many :counters
	# Methode welche den Loading Splash pro Champion zurück gibt
	def loadingChamps
		$allchamps.each do |champ|
			if champ[:name] == self[:name]
				# Bearbeitet den String so, das er für die Loading Splashs benutzt werden kann
				@imgChamp = self[:name].gsub(/[^0-9a-z ]/i, '').delete(' ')
				# Beinhaltet alle ausnahmen wegen schlechten Api Namen Nennung
				if champ[:name] == "Fiddlesticks"
					@imgChamp = "FiddleSticks"
				elsif champ[:name] == "Kha'Zix"
					@imgChamp = "Khazix"
				elsif champ[:name] == "Cho'Gath"
					@imgChamp = "Chogath"
				elsif champ[:name] == "LeBlanc"
					@imgChamp = "Leblanc"
				elsif champ[:name] == "Wukong"
					@imgChamp = "MonkeyKing"
				elsif champ[:name] == "Vel'Koz"
					@imgChamp = "Velkoz"
				end
			end
		end
		url = "http://ddragon.leagueoflegends.com/cdn/" + "img/champion/loading/" + @imgChamp + "_0.jpg"
		return url
	end
	# Methode welche das Portrait des einzelnen Champions zurück gibt
	def portraitChamps
		$allchamps.each do |champ|
			if champ[:name] == self[:name]
				champ.image.each do |string, img|
					if string == "full"
						@imgChamp = img
					end
				end
			end
		end
		url = $apiurl + "champion/" + @imgChamp.to_s
		return url
	end
	# Methode welche das Splash bild pro Champion zurück gibt
	def splashChamps
		$allchamps.each do |champ|
			if champ[:name] == self[:name]
				# Bearbeitet den String so, das er für die Loading Splashs benutzt werden kann
				@imgChamp = self[:name].gsub(/[^0-9a-z ]/i, '').delete(' ')
				# Beinhaltet alle ausnahmen wegen schlechten Api Namen Nennung
				if champ[:name] == "Fiddlesticks"
					@imgChamp = "FiddleSticks"
				elsif champ[:name] == "Kha'Zix"
					@imgChamp = "Khazix"
				elsif champ[:name] == "Cho'Gath"
					@imgChamp = "Chogath"
				elsif champ[:name] == "LeBlanc"
					@imgChamp = "Leblanc"
				elsif champ[:name] == "Wukong"
					@imgChamp = "MonkeyKing"
				elsif champ[:name] == "Vel'Koz"
					@imgChamp = "Velkoz"
				end
			end
		end
		url = "http://ddragon.leagueoflegends.com/cdn/" + "img/champion/splash/" + @imgChamp + "_0.jpg"
		return url
	end

	def getSpells
		$allchamps.each do |champ|
			if champ[:name] == self[:name]
				spells = champ.spells
				puts spells
			end
		end

	end

	# Methode welche einen Hash erstellt mit infos über den Champion
	def getChampInfo
		champInfo = Hash.new

		# Schlauft durch den ganzen champ array durch bis der eigene champ gefudnen wurde
		$allchamps.each do |champ|
			if champ[:name] == self[:name]

				champInfo["info"] = champ.info
				champInfo["tags"] = champ.tags
				champInfo["stats"] = champ.stats
			end
		end
		return champInfo
	end

	# Methode erstellt neuen Hashes mit den wichtigen informationen
	def getSpellHash
		# Neue Hashes
		@allSpells = Hash.new
		spellQ = Hash.new
		spellW = Hash.new
		spellE = Hash.new
		spellR = Hash.new

		# Arrays welche gebraucht werden
		@sant = Array.new
		santEffect = Array.new
		arrayEffects = Array.new
		arrayName = Array.new
		arrayCooldown = Array.new
		arrayCostType = Array.new
		arrayCostBurn = Array.new
		arrayImageSpellUrl = Array.new
		arrayRange = Array.new
		arrayResourcePlain = Array.new
		arrayResource = Array.new

		arraySkillScale = Array.new
		$allchamps.each do |champ|



			@spells = champ.spells
			if champ[:name] == self[:name]


				# Schlauft durch alle spells und speichert die informationen die wir brauchen in arrays
				@spells.each do |spell|
					puts spell
					spell.each do |key,value|
						if key == "sanitizedTooltip"
							@sant.push(value)
						end
						if key == "name"
							arrayName.push(value)
						end
						if key == "cooldownBurn"
							arrayCooldown.push(value)
						end
						if key == "costType"
							arrayCostType.push(value)
						end
						if key == "costBurn"
							arrayCostBurn.push(value)
						end
						if key == "rangeBurn"
							arrayRange.push(value)
						end
						if key == "image"
							value.each do |k,v|
								if k == "full"
									@img = v
								end
							end
							url = $apiurl + "spell/" + @img
							arrayImageSpellUrl.push(url)
						end
						if key == "resource"
							arrayResourcePlain.push(value)
						end
					end
				end

				# TEIL FUER DIE RESSOURCEN

				costCount = 0
				arrayResourcePlain.each do |res|
					# Wenn der String ein { enthaelt so ist es kein normaler mana typ und man muss die kosten richtig machen
					if !res.include? 'cost' and !res.include? 'No Cost'
						inhalt = res.scan(/\{(.*?)\}/)[0].to_s
						inhalt.delete! "{[]"
						inhalt.delete!(' ')
						puts inhalt
						# macht aus "e1" -> e1
						richtigInhalt = inhalt[1] + inhalt[2]
						puts richtigInhalt

							@spells[costCount].each do |key,value|
								if key == "effectBurn"
									# Speichert den gesuchten wert abs
									wert = value[inhalt[2].to_i]
									puts wert
									newText = res.dup
									newText.sub! "#{richtigInhalt}", "#{wert}"
									newText.delete! "{}"
									arrayResource.push(newText)

								end
							end
					# Wenn die kosten in dem key cost zu suchen sind
					elsif res.include? 'cost'
						@spells[costCount].each do |key,value|
							if key == "costBurn"
								# Speichert den gesuchten wert abs
								wert = value
								newText = res.dup
								newText.sub! "{{ cost }}", "#{wert}"
								arrayResource.push(newText)

							end
						end



					elsif res.include? 'No Cost'
						arrayResource.push(res)
					end

				costCount += 1
			end

			# Weil die API bei maokai ult als einziges ein e4 drin hat wird dies einzeln gelöst sollte man aber nochaml überdenken
			if champ[:name] == "Maokai"
				newMao = arrayResource[3].dup
				newMao.sub! "{{ e4 }}","30"
				arrayResource[3] = newMao
			end

				# TEIL FUER DIE DESCRIPTION

				# nimmt alle teile mit {{ }} im string raus und spechert den inhalt in ein array -> ["e1","a1","e5"]
				@sant.each do |skill|
					santEffect = []
					arrayBrackets = skill.scan(/\{(.*?)\}/)

					arrayBrackets.each do |ele|

						withoutBrackets = ele[0].delete! "{}"
						# löscht alle whitespaces
						santEffect.push(withoutBrackets.strip)

					end
					# hat für alle abilities die richtigen effect und keys => ["["e1","a1","e5"]","["e3","e5","a2"]".....]
					arrayEffects.push(santEffect)
				end

				#Array in dem die richtigen infos gespeichert wird
				arraySpellEffects = Array.new

				count = 0
				@spells.each do |spell|
					arrayEffects[count].each do |effect|
						# Wenn es sich um ein effect handelt = "e" dann muss man in der tabelle "effectBurn" suchen
						if effect[0] == "e"
							# Schlauft durch alle spells des champs
							spell.each do |key,value|
								if key == "effectBurn"
									# Speichert den gesuchten wert abs
									wert = value[effect[1].to_i]
									arraySpellEffects.push(wert)

								end
							end
						# Wenn es sich um ein coeff handelt = "a" so muss man diesen coeff in der tabelle "vars" suchen
						elsif effect[0] == "a"
							bool = false
							# Schlauft durch alle spells des champs
							spell.each do |key,value|
								if key == "vars"

									value.each do |vars|
										vars.each do |key, value|
											# wenn der Key "key" so muss überprüft werden ob dieser den gelichen value hat wie effect
											if key == "key"
												if value == effect
													bool = true
												end
											end
											# Stimmt der key überein so kann dieser wert genommen werden
											if bool
												if key == "coeff"
													@coeff = value


												end
												# Fügt den dmg typ der skalierung dem array hinzus
												if key == "link"
													@dmgType = value

												end

											end

										end
										arraySpellEffects.push(@coeff.to_s + " " + @dmgType.to_s)
									end
								end
							end
						end
					end
					count += 1
				end
				puts arraySkillScale

				#Loop that replace the text with the correct values
				newSkills = Array.new
				count = 0
				arrayEffectCount = 0
				arrayScaleCount = 0
		    @sant.each do |skill|
					# dup ist wichtig damit man den kopierten string bearbeitet und nicht den orignal den man von der api bekommt
					newText = skill.dup
					arrayEffects[count].each do |effects|
						if skill.include?(effects)
							# Die f abfragen scheinen buggy zu sein bei der API
							if effects[0] != "f"
									# sub| erstellt einen neuen string aus dem vorherigen
									@text = newText.sub! "#{effects}", "#{arraySpellEffects[arrayEffectCount]}"

								arrayEffectCount += 1
								arrayScaleCount += 1
							end
						end
					end
					@text.delete! "{}"
					@text.delete! "[]"
					newSkills.push(@text)
					count +=1

				end

				#added den Inhalt der Array dem richtigen Hash zu =>	arrayName arrayCooldown arrayCostType arrayCostBurn
				spellCount = 0
				4.times do
					if spellCount == 0
						spellQ["description"] = newSkills[0]
						spellQ["name"] = arrayName[0]
						spellQ["cooldown"] = arrayCooldown[0]
						spellQ["costType"] = arrayCostType[0]
						spellQ["costBurn"] = arrayCostBurn[0]
						spellQ["image"] = arrayImageSpellUrl[0]
						spellQ["range"] = arrayRange[0]
						spellQ["ressource"] = arrayResource[0]
					elsif spellCount == 1
						spellW["description"] = newSkills[1]
						spellW["name"] = arrayName[1]
						spellW["cooldown"] = arrayCooldown[1]
						spellW["costType"] = arrayCostType[1]
						spellW["costBurn"] = arrayCostBurn[1]
						spellW["image"] = arrayImageSpellUrl[1]
						spellW["range"] = arrayRange[1]
						spellW["ressource"] = arrayResource[1]
					elsif spellCount == 2
						spellE["description"] = newSkills[2]
						spellE["name"] = arrayName[2]
						spellE["cooldown"] = arrayCooldown[2]
						spellE["costType"] = arrayCostType[2]
						spellE["costBurn"] = arrayCostBurn[2]
						spellE["image"] = arrayImageSpellUrl[2]
						spellE["range"] = arrayRange[2]
						spellE["ressource"] = arrayResource[2]
					elsif spellCount == 3
						spellR["description"] = newSkills[3]
						spellR["name"] = arrayName[3]
						spellR["cooldown"] = arrayCooldown[3]
						spellR["costType"] = arrayCostType[3]
						spellR["costBurn"] = arrayCostBurn[3]
						spellR["image"] = arrayImageSpellUrl[3]
						spellR["range"] = arrayRange[3]
						spellR["ressource"] = arrayResource[3]
					end
					spellCount += 1
				end
				# Adde alle Hashes dem Hash mit allen spells

				@allSpells["Q"] = spellQ
				@allSpells["W"] = spellW
				@allSpells["E"] = spellE
				@allSpells["R"] = spellR

				end
			end

			puts @allSpells
			return @allSpells
		end

end
