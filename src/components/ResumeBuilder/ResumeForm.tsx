
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">ID Type</label>
                  <Select 
                    value={resumeData.personalDetails.idType} 
                    onValueChange={(value) => updatePersonalDetails({ idType: value as IdType })}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-medsume-teal">
                      <SelectValue placeholder="Select ID type" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-white/10 text-white max-h-60">
                      {getIdTypeList().map(option => (
                        <SelectItem key={option.value} value={option.value} className="focus:bg-medsume-teal/20 focus:text-white">
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
