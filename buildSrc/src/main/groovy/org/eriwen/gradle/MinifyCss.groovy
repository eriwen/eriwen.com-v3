package org.eriwen.gradle

import org.gradle.api.DefaultTask
import org.gradle.api.tasks.TaskAction

import com.yahoo.platform.yui.compressor.CssCompressor

class MinifyCss extends DefaultTask {
	String charset = 'UTF-8'
	Integer lineBreakPos = -1
	def inputFile
	def outputFile

	@TaskAction
	def run() {
		InputStreamReader reader = new InputStreamReader(new FileInputStream(inputFile), charset)
		OutputStreamWriter writer = new OutputStreamWriter(new FileOutputStream(outputFile), charset)
		CssCompressor compressor = new CssCompressor(reader)
		compressor.compress(writer, lineBreakPos)
	}
}
